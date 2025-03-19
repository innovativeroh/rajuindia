"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";

import { FaCakeCandles } from "react-icons/fa6";
import { GiCamel } from "react-icons/gi";
import { IoSunnyOutline } from "react-icons/io5";
import { GiFireworkRocket } from "react-icons/gi";
import { GiIndiaGate } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import mapWalk from "@/../public/img/mapWalk.png";

// Define types for our experience items
interface ExperienceItem {
  id: number;
  image: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Sample data - replace with your actual data
const items: ExperienceItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1717964028300-f2861ae1bf8a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Soulful Rajasthan",
    description:
      "Mysterious, royal, colourful, mystical and unique…  Inhabited by hundreds of different tribes boasting their own peculiar style of clothing. Camels in Thar Desert, women in multi color saris, forts, palaces and overnight safaris under the stars, are some of the many ways for your soul, to vibrate in Rajasthan.",
    icon: <GiCamel />
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1668966779417-e402a1407a50?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Curated Journeys",
    description:
      "Indian culture is an amalgamation of many civilizations, people and traditions, several millennia old. Its thousand tongues, music, architecture, food and customs are diverse from place to place within the country. Declared by UNESCO “Intangible Cultural Heritage of Humanity”. Come and live with us a handpicked breathtaking experiences created for you.",
    icon: <FaCakeCandles />
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1591654817909-9299b1ce9b52?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/img/img3.png",
    title: "Day Journeys",
    description:
      "Our day journeys are created and thought to give you a glimpse of its cultural heritage, ethnicity, historic monuments and spiritual aura. Experience Indias magic within a Day. ",
    icon: <IoSunnyOutline />
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1728272360172-53c6d5427b7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Festivals",
    description:
      "India has seen most of the world religions in front of her eyes: Hinduism, Sikhism, Buddhism, and Jainism were born in her arms. Her spiritual sense emanates everywhere around her where life is revered and worshiped in mandirs (Hindu temples), mosques, gurudwaras, and churches. Divine beliefs, rituals and festivals are practiced along this magnificent land.",
    icon: <GiFireworkRocket />
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Destinations",
    description:
      "India is home of countless and extraordinary destinations to be discovered and captured in your memories. Each region has its own charm, beauty and singularity. Come and loose yourself in its charismatic magic. ",
    icon: <GiIndiaGate />
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Student Journeys",
    description:
      "With Incredible Real India your options are limitless. We will handle all the logistics so you can focus on inspiring your students and gearing them up for the road. With proper planning and execution, you can turn any field trip into a forever memory. Make India your stage.",
    icon: <IoBookOutline />
  }
];

export default function Experiences(): JSX.Element {
  const [emblaRef, setEmblaRef] = useState<EmblaCarouselType | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaRef) return;

    const autoplay = setInterval(() => {
      if (emblaRef.canScrollNext()) {
        emblaRef.scrollNext();
      } else {
        emblaRef.scrollTo(0); // Return to first slide when reaching the end
      }
    }, 3000);

    return () => clearInterval(autoplay);
  }, [emblaRef]);

  return (
    <>
      <div className="w-full bg-blue-900 py-20 relative">
        {/* Background Image Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={mapWalk}
            alt="Map Walk"
            className="w-full opacity-100" // Optional: Adjust opacity or styling
          />
        </div>

        <Carousel
          className="w-full max-w-[1300px] mx-auto relative z-10" // Ensure carousel stays above the background image
          opts={{
            align: "start",
            loop: true // Enable infinite scroll
          }}
          setApi={(api) => setEmblaRef(api ?? null)}
        >
          <div className="text-center pb-10">
            <h1 className="text-white text-6xl playfair font-extrabold">
              Travel Experiences
            </h1>
            <p className="text-white montserrat mt-2 font-light">
              Curated Journeys, Destinations & Festivals to immerse yourself
              <br />
              into a unique, unforgettable India
            </p>
            <h1 className="text-white mt-8 playfairDisplay text-3xl font-bold">
              Come & Let India Touch Your Soul <br />& Awake Your Senses!
            </h1>
          </div>
          <CarouselContent className="-ml-4">
            {items.map((item: ExperienceItem) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card
                    className="overflow-hidden rounded-none border-none"
                    onMouseEnter={() => setIsHovered(item.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <CardContent className="relative p-0 h-[460px]">
                      {/* Image */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover transition-all duration-300"
                          style={{
                            filter:
                              isHovered === item.id
                                ? "brightness(0.7)"
                                : "brightness(1)"
                          }}
                        />
                      </div>

                      {/* Overlay with title and icon when not hovered */}
                      <div
                        className="absolute inset-0 flex flex-col justify-center playfair items-center p-6 text-white transition-opacity duration-300"
                        style={{
                          opacity: isHovered === item.id ? 0 : 1
                        }}
                      >
                        <div className="text-white text-4xl mb-2">
                          {item.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-center">
                          {item.title}
                        </h3>
                      </div>

                      {/* Content that appears on hover */}
                      <div
                        className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white transition-opacity duration-300"
                        style={{
                          opacity: isHovered === item.id ? 1 : 0
                        }}
                      >
                        <div className="text-white text-4xl mb-2">
                          {item.icon}
                        </div>
                        <h3 className="text-3xl font-bold mb-2 playfair">
                          {item.title}
                        </h3>
                        <p className="text-sm text-center">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
