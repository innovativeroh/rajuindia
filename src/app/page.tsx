"use client";
import { useState, useEffect } from "react";
import HeroSlider from "@/components/hero-slider";
import Navbar from "@/components/navbar";
import About from "@/components/about";
import Experiences from "@/components/experiences";
import Journeys from "@/components/journeys";
import Quote from "@/components/quote";
import { MarqueeSlider } from "@/components/marquee";
import Prefooter from "@/components/prefooter";
import { Footer } from "@/components/footer";

import Loader from "@/../public/img/loader.gif";
import Loader2 from "@/../public/img/logoText.png";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-col gap-2 min-h-screen bg-white">
        <Image src={Loader} alt="Loader" width={200} />
        <Image src={Loader2} alt="Loader" width={200} />
      </div>
    );
  }
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
