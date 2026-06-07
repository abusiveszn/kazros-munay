import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const cardVertexShader = `
uniform float uCurvature;
uniform float uCurveFrequency;
uniform float uHorizontalCurve;
varying vec2 vUv;
#define PI 3.141592653

void main() {
  vec3 pos = position;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  float xDisplacement = uCurvature * cos(worldPosition.y * uCurveFrequency);
  pos.x += xDisplacement;
  pos.x -= uCurvature;

  float yDisplacement = -uHorizontalCurve * cos(pos.x * PI);
  pos.y += yDisplacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vUv = uv;
}
`;

const cardFragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);
  gl_FragColor = texColor;
}
`;

interface CarouselCardProps {
  texturePath: string;
  angle: number;
  radius: number;
  cardWidth: number;
  cardHeight: number;
}

function CarouselCard({ texturePath, angle, radius, cardWidth, cardHeight }: CarouselCardProps) {
  const texture = useTexture(texturePath);
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: cardVertexShader,
      fragmentShader: cardFragmentShader,
      uniforms: {
        uCurvature: { value: 0.12 },
        uCurveFrequency: { value: 0.8 },
        uCurveStrength: { value: 1.0 },
        uHorizontalCurve: { value: 0.08 },
        uTexture: { value: texture },
      },
      side: THREE.DoubleSide,
    });
  }, [texture]);

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const rotY = Math.atan2(x, z);

  return (
    <mesh
      ref={meshRef}
      position={[x, 0, z]}
      rotation={[0, rotY, 0]}
      material={material}
    >
      <planeGeometry args={[cardWidth, cardHeight, 40, 40]} />
    </mesh>
  );
}

interface CarouselSceneProps {
  images: string[];
}

function CarouselScene({ images }: CarouselSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const autoRotation = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const rotationOnDragStart = useRef(0);
  const { gl } = useThree();

  const config = {
    cardWidth: 1.6,
    cardHeight: 2.0,
    radius: 4.0,
    rotationSpeed: 0.08,
    wheelSensitivity: 0.001,
    dragSensitivity: 0.005,
    cardYPosition: -1.2,
  };

  const cardCount = images.length;
  const arcAngle = (Math.PI * 2) / cardCount;

  useEffect(() => {
    const canvas = gl.domElement;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRotation.current -= e.deltaY * config.wheelSensitivity;
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
      rotationOnDragStart.current = targetRotation.current;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - dragStartX.current;
      targetRotation.current = rotationOnDragStart.current - deltaX * config.dragSensitivity;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [gl, config.wheelSensitivity, config.dragSensitivity]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!isDragging.current) {
      autoRotation.current += config.rotationSpeed * delta * 0.1;
    }

    currentRotation.current += (targetRotation.current - currentRotation.current) * 0.08;

    const totalRotation = currentRotation.current + autoRotation.current;
    groupRef.current.rotation.y = totalRotation;
  });

  return (
    <group ref={groupRef} position={[0, config.cardYPosition, 0]}>
      {images.map((img, i) => (
        <CarouselCard
          key={i}
          texturePath={img}
          angle={i * arcAngle}
          radius={config.radius}
          cardWidth={config.cardWidth}
          cardHeight={config.cardHeight}
        />
      ))}
    </group>
  );
}

export default function HeroCarousel() {
  const images = [
    '/images/card-en590.jpg',
    '/images/card-jeta1.jpg',
    '/images/card-d2.jpg',
    '/images/card-d6.jpg',
    '/images/card-lng.jpg',
    '/images/about-ship.jpg',
    '/images/hero-bg.jpg',
    '/images/card-en590.jpg',
  ];

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <CarouselScene images={images} />
      </Canvas>
    </div>
  );
}
