import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import HomeAboutSection from '@/app/components/HomeAboutSection';
import FeaturedProperties from '@/app/components/FeaturedProperties';
import WhyChooseUs from '@/app/components/WhyChooseUs';
import PremiumProperties from '@/app/components/PremiumProperties';
import StatsSection from '@/app/components/StatsSection';
import TrendsSection from '@/app/components/TrendsSection';
import FAQ from '@/app/components/FAQ';
import PartnersCarousel from '@/app/components/PartnersCarousel';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperties />
        <PremiumProperties />
        <HomeAboutSection />
        <WhyChooseUs />
        <StatsSection />
        <TrendsSection />
        <FAQ />
        <PartnersCarousel />
      </main>
      <Footer />
    </>
  );
}
