import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import FeaturedProperties from '@/app/components/FeaturedProperties';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperties />
      </main>
      <Footer />
    </>
  );
}
