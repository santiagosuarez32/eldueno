import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import FeaturedProperties from '@/app/components/FeaturedProperties';
import StatsSection from '@/app/components/StatsSection';
import FAQ from '@/app/components/FAQ';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperties />
        <StatsSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
