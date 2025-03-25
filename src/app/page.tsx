import HeroSlider from "@/components/hero-slider";
import Navbar from "@/components/navbar";
import About from "@/components/about";
import Experiences from "@/components/experiences";
import Journeys from "@/components/journeys";
import Quote from "@/components/quote";
import { MarqueeSlider } from "@/components/marquee";
import Prefooter from "@/components/prefooter";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <About />
      <Experiences />
      <Journeys />
      <Quote />
      <div className="lg:block hidden">
      <Prefooter />
      </div>
      <MarqueeSlider />
      <Footer />
    </>
  );
}
