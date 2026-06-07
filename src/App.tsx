import Hero from './sections/Hero';
import Statistics from './sections/Statistics';
import Products from './sections/Products';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="relative">
      <Hero />
      <Statistics />
      <Products />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
