import CallToAction from "@/components/home/CallToAction";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
      <main className="flex-grow w-full">
        <Hero />
        <FeaturedCategories />
        <HowItWorks />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <CallToAction />
        </div>
      </main>
    </div>
  );
}
