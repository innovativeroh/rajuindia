"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

interface Testimonial {
  content: string;
  author?: string;
  position?: string;
  logoSrc: string;
  logoAlt: string;
  rating?: number;
  isVerified?: boolean;
}

const testimonials: Testimonial[] = [
  {
    content:
      "Highly Ranked Travel Company with Travellers Choice with First Class Service.",
    author: "The New York Times",
    position: "News Platform",
    logoSrc: "/img/Marquee/Marquee1.png",
    logoAlt: "TripAdvisor Logo",
    rating: 5,
    isVerified: true
  },
  {
    content: "For safety reasons, we are choice of solo female travellers.",
    author: "Tripadvisor",
    position: "Tripadvisor",
    logoSrc: "/img/Marquee/Marquee2.png",
    logoAlt: "Solo Travel Magazine Logo",
    rating: 4.5,
    isVerified: true
  },
  {
    content:
      "Highly recommend a tour outfit called Raju India that lets you pick your own itinerary in that region.",
    author: "International Travel News",
    position: "News Platform",
    logoSrc: "/img/Marquee/Marquee3.png",
    logoAlt: "Wanderlust Logo",
    rating: 5,
    isVerified: true
  },
  {
    content: "Highly recommended Company to trust for India Travel.",
    author: "Global Explorers",
    position: "Travel Association",
    logoSrc: "/img/logo.png",
    logoAlt: "Global Explorers Logo",
    rating: 4.5,
    isVerified: true
  }
];

interface TestimonialCardProps {
  content: string;
  author?: string;
  position?: string;
  logoSrc: string;
  logoAlt: string;
  rating?: number;
  isVerified?: boolean;
}

const RatingStars = ({ rating }: { rating?: number }) => {
  if (!rating) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center mb-3">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`star-${i}`} className="text-yellow-400 mr-1" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 mr-1" />}
      <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const TestimonialCard = ({
  content,
  author,
  position,
  logoSrc,
  logoAlt,
  rating,
  isVerified
}: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative h-auto lg:w-[420px] w-[380px] mx-4 rounded-2xl border bg-white dark:bg-gray-900/90",
        "border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden backdrop-blur-sm",
        "transition-all duration-300 hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/20"
      )}
    >
      <div className="flex flex-col h-full p-6 lg:p-8">
        {/* Quote icon and rating */}
        <div className="flex justify-between items-start mb-4">
          <FaQuoteLeft className="text-primary/30 dark:text-primary/20 text-3xl montserrat" />
          <RatingStars rating={rating} />
        </div>

        {/* Content */}
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 font-serif italic leading-relaxed">
          {content}
        </p>

        {/* Author and position with verified badge (if applicable) */}
        {(author || position) && (
          <div className="mt-auto mb-4">
            <div className="flex items-center">
              {author && (
                <p className="font-medium text-gray-900 dark:text-gray-100 montserrat">
                  {author}
                </p>
              )}
              {isVerified && (
                <MdVerified
                  className="ml-2 text-primary text-lg"
                  title="Verified Review"
                />
              )}
            </div>
            {position && (
              <p className="text-sm text-gray-500 dark:text-gray-400 montserrat">
                {position}
              </p>
            )}
          </div>
        )}

        {/* Logo */}
        <div className="relative h-16 w-full mt-auto flex items-center">
          <div className="relative group w-full">
            <Image
              className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              width={180}
              height={60}
              alt={logoAlt}
              src={logoSrc}
              priority={false}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function MarqueeSlider() {
  return (
    <section className="py-16 md:py-20 mesh2 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="container mx-auto px-4 mb-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white mb-4 font-serif">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto montserrat">
            Discover why travelers from around the world choose us for their
            Indian adventures
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s] py-4" reverse={false}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Marquee>

      </div>
    </section>
  );
}
