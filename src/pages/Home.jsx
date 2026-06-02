import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import RecipeShowcase from '../components/RecipeShowcase';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <RecipeShowcase />
      <HowItWorks />
      <Footer />
    </div>
  );
}
