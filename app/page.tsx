import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import HomeAboutSection from '@/app/components/HomeAboutSection';
import FeaturedProperties from '@/app/components/FeaturedProperties';
import WhyChooseUs from '@/app/components/WhyChooseUs';
import PremiumProperties from '@/app/components/PremiumProperties';
import StatsSection from '@/app/components/StatsSection';
import FAQ from '@/app/components/FAQ';
import PartnersCarousel from '@/app/components/PartnersCarousel';
import Footer from '@/app/components/Footer';

import GoogleReviewsWidget from '@/app/components/GoogleReviewsWidget';

export const revalidate = 60; // ISR cache every 60 seconds

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <hr className="border-slate-200 m-0" />
        <FeaturedProperties />
        <hr className="border-slate-200 m-0" />
        <PremiumProperties />
        <hr className="border-slate-200 m-0" />
        <HomeAboutSection />
        <hr className="border-slate-200 m-0" />
        <WhyChooseUs />
        <hr className="border-slate-200 m-0" />
        <GoogleReviewsWidget />
        <hr className="border-slate-200 m-0" />
        <StatsSection />
        <hr className="border-slate-200 m-0" />
        <FAQ />
        <hr className="border-slate-200 m-0" />
        <PartnersCarousel />
      </main>
      <Footer />
    </>
  );
}
