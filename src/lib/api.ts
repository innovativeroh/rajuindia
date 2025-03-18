import type { Slide } from "@/types/slider"
import slidesData from "@/data/slides.json"

export async function getSlides(): Promise<Slide[]> {
  // In a real application, this would fetch from an API
  // For now, we'll just return the JSON data with a simulated delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(slidesData as Slide[])
    }, 300)
  })
}

