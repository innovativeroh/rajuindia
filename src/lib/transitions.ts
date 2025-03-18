// Custom transition presets for smoother animations
export const fadeTransition = {
    duration: 1,
    ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier for smooth easing
  }
  
  export const slideTransition = {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1.0],
  }
  
  export const staggerChildren = {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  }
  
  // Variants for page transitions
  export const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...fadeTransition,
        when: "beforeChildren",
        ...staggerChildren,
      },
    },
    exit: {
      opacity: 0,
      transition: { ...fadeTransition },
    },
  }
  
  // Variants for slide transitions
  export const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        ...slideTransition,
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        ...slideTransition,
        opacity: { duration: 0.3 },
      },
    }),
  }
  
  // Variants for content elements
  export const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...fadeTransition, delay: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { ...fadeTransition },
    },
  }
  
  