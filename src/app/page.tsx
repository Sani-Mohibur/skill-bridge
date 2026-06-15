import CallToAction from "@/components/home/CallToAction";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <FeaturedCategories />
        <HowItWorks />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
