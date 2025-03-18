export interface Slide {
    id: number
    title: string
    description: string
    image: string
    link: string
    location?: string
  }
  
  export interface SliderProps {
    autoplay?: boolean
    autoplaySpeed?: number
    pauseOnHover?: boolean
  }
  
  