import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import FeaturedProperties from '@/app/components/FeaturedProperties';
import WhyChooseUs from '@/app/components/WhyChooseUs';
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
        <WhyChooseUs />
        <StatsSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
