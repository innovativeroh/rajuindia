"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Pause, Play } from "lucide-react";
import type { Slide, SliderProps } from "@/types/slider";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

// Enhanced transition variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
      scale: { duration: 0.8, ease: "easeOut" }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
      scale: { duration: 0.5 }
    }
  })
};

// Enhanced content variants with staggered animations
const contentVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 30 : -30
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? 30 : -30,
    transition: {
      duration: 0.4
    }
  })
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

export default function HeroSlider({
  autoplay = true,
  autoplaySpeed = 5000,
  pauseOnHover = true
}: SliderProps) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(0); // Track slide direction
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [zoomComplete, setZoomComplete] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation controls for the continuous zoom effect
  const imageControls = useAnimationControls();
  // Animation controls for the overlay dimming effect
  const overlayControls = useAnimationControls();

  // Fetch slides data
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Dynamic import to ensure this works with SSR
        const { getSlides } = await import("@/lib/api");
        const data = await getSlides();
        setSlides(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch slides:", error);
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Reset image loaded state and zoom complete state when slide changes
  useEffect(() => {
    setIsImageLoaded(false);
    setZoomComplete(false);
  }, [currentSlide]);

  // Start zoom and dimming animations when image is loaded
  useEffect(() => {
    if (isImageLoaded) {
      // Start the continuous zoom animation
      imageControls.start({
        scale: 1.2, // End scale value - slightly more zoom for dramatic effect
        transition: {
          duration: autoplaySpeed / 1000, // Convert ms to seconds
          ease: "linear",
          onComplete: () => {
            setZoomComplete(true);
          }
        }
      });

      // Gradually increase the dimming effect as the zoom progresses
      overlayControls.start({
        opacity: 0.5, // End with a more pronounced dimming
        transition: {
          duration: autoplaySpeed / 1000,
          ease: "easeInOut"
        }
      });
    }
  }, [isImageLoaded, imageControls, overlayControls, autoplaySpeed]);

  // Memoize navigation functions with useCallback
  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || slides.length === 0) return;
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide, slides.length]
  );

  // Handle autoplay - either based on zoomComplete or autoplaySpeed
  useEffect(() => {
    if (loading || slides.length === 0 || !isImageLoaded) return;

    const shouldAutoplay = isAutoPlaying && !(pauseOnHover && isHovering);

    if (shouldAutoplay) {
      // If zoom is complete, change slide immediately
      if (zoomComplete) {
        nextSlide();
        return;
      }
      
      // Otherwise use the standard timer
      autoplayTimerRef.current = setTimeout(() => {
        setDirection(1);
        nextSlide();
      }, autoplaySpeed);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [
    currentSlide,
    isAutoPlaying,
    isHovering,
    loading,
    slides.length,
    autoplaySpeed,
    pauseOnHover,
    nextSlide,
    isImageLoaded,
    zoomComplete
  ]);

  const toggleAutoplay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  // Get next two slides for preview cards
  const getNextSlides = () => {
    if (slides.length < 3) return slides;

    const nextIndex = (currentSlide + 1) % slides.length;
    const nextNextIndex = (currentSlide + 2) % slides.length;

    return [slides[nextIndex], slides[nextNextIndex]];
  };

  // Preload next images
  useEffect(() => {
    if (slides.length === 0) return;
    
    const nextSlides = getNextSlides();
    nextSlides.forEach(slide => {
      if (slide.image) {
        // Use the DOM API directly to avoid TypeScript errors with Image constructor
        const preloadImage = document.createElement("img");
        preloadImage.src = slide.image;
        // No need to append to DOM, just create the element to trigger preload
      }
    });
  }, [currentSlide, slides]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <p className="text-white text-xl">No slides available</p>
      </div>
    );
  }

  const nextSlides = getNextSlides();
  const currentSlideData = slides[currentSlide];

  return (
    <div
      ref={sliderRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main slider with improved transitions */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full overflow-hidden">
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.05 }}
              animate={imageControls}
            >
              <Image
                src={currentSlideData.image || "/placeholder.svg"}
                alt={currentSlideData.title || "Slide image"}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </motion.div>
          </div>
          {/* Enhanced overlay with progressive dimming */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0.3 }}
            animate={overlayControls}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content with smoother staggered animations */}
      <div className="relative z-10 h-full w-full">
        <div className="container mx-auto h-full px-4 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-center">
            {/* Main slide content with smoother animations */}
            <div className="lg:col-span-7 pt-20 lg:pt-0">
              <AnimatePresence custom={direction} mode="sync">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  {currentSlideData.location && (
                    <motion.p
                      variants={itemVariants}
                      className="text-orange-400 text-sm mb-2 tracking-wider"
                    >
                      {currentSlideData.location}
                    </motion.p>
                  )}
                  <motion.h1 
                    variants={itemVariants}
                    className="text-6xl md:text-8xl playfair font-extrabold text-white mb-4"
                  >
                    {currentSlideData.title || "Slide Title"}
                  </motion.h1>
                  <motion.p 
                    variants={itemVariants}
                    className="text-white/90 playfair text-lg md:text-xl max-w-md mb-8"
                  >
                    {currentSlideData.description || "Slide description"}
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    <Link
                      href={currentSlideData.link || "#"}
                      className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all duration-300 hover:translate-x-1"
                    >
                      Explore
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Preview cards with improved animations */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-6 items-end">
              {nextSlides.map((slide, index) => (
                <motion.div
                  key={`preview-${slide.id || index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                  className="relative w-64 h-80 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() =>
                    goToSlide(slides.findIndex((s) => s.id === slide.id))
                  }
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title || `Slide ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 cursor-pointer">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold playfair">
                      {slide.title || `Slide ${index + 1}`}
                    </h3>
                    {slide.location && (
                      <p className="text-sm text-white/80">{slide.location}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white w-6" : "bg-white/50 w-2"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 hidden lg:block transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white transition-colors"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 hidden lg:block transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white transition-colors"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>

          {/* Autoplay control */}
          <motion.button
            onClick={toggleAutoplay}
            className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}