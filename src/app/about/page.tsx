"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import TeamGrid from "@/components/ui/TeamGrid";
import { MapPin, Globe, Users, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";

// FAQ Data in JSON format
const faqData = [
  {
    id: "item-1",
    question: "How far in advance should I book my trip to India?",
    answer:
      "We recommend booking your trip at least 3-6 months in advance, especially if you're planning to travel during peak season (October to March). This allows us enough time to secure the best accommodations and experiences for your journey. For last-minute travelers, we do our best to accommodate your needs, but availability may be limited.",
  },
  {
    id: "item-2",
    question: "What is included in your tour packages?",
    answer:
      "Our standard tour packages include accommodation, transportation within India (including airport transfers), guided tours with expert local guides, entrance fees to attractions, and some meals as specified in your itinerary. International flights, visa fees, travel insurance, and personal expenses are typically not included. We can customize any package to include additional services based on your preferences.",
  },
  {
    id: "item-3",
    question: "Is India safe for solo female travelers?",
    answer:
      "Yes, India can be safe for solo female travelers with proper planning and precautions. We specialize in creating secure and enriching experiences for solo female travelers, providing trusted guides, carefully selected accommodations, and 24/7 support throughout your journey. We'll advise you on local customs, appropriate dress, and areas to avoid to ensure your safety and comfort.",
  },
  {
    id: "item-4",
    question: "What is your cancellation policy?",
    answer:
      "Our standard cancellation policy offers a full refund (minus processing fees) for cancellations made 60 days or more before your trip. Cancellations 30-59 days before departure receive a 50% refund, while those made less than 30 days before departure are non-refundable. We strongly recommend purchasing travel insurance to protect against unexpected circumstances. For specific situations, please contact us directly.",
  },
  {
    id: "item-5",
    question: "Do I need a visa to visit India?",
    answer:
      "Most international travelers need a visa to visit India. Many nationalities can apply for an e-Visa online, which is typically processed within 3-5 business days. We can provide guidance on the visa application process, but it remains the traveler's responsibility to secure the appropriate visa before departure. We recommend applying at least 4 weeks before your trip.",
  },
  {
    id: "item-6",
    question: "What type of accommodations do you offer?",
    answer:
      "We offer a range of accommodations to suit different preferences and budgets, from luxury heritage hotels and boutique properties to comfortable mid-range options. Many of our preferred accommodations are carefully selected for their character, service quality, and authentic Indian experience. We can customize your itinerary to include specific types of accommodations based on your preferences.",
  },
  {
    id: "item-7",
    question: "What is the best time to visit India?",
    answer:
      "The best time to visit India generally depends on the regions you plan to explore. October to March is considered the peak tourist season with pleasant weather across most of the country. April to June can be very hot, while July to September brings the monsoon season. For specific regions like Kerala or the Himalayas, different seasons may be more optimal. We can help you plan according to your preferred destinations.",
  },
  {
    id: "item-8",
    question: "Do you offer customized itineraries?",
    answer:
      "Absolutely! We specialize in creating tailor-made journeys based on your interests, time constraints, and budget. Whether you're interested in cultural heritage, spiritual experiences, wildlife, or culinary adventures, we can design a personalized itinerary that suits your preferences perfectly. Just let us know your requirements, and our experts will craft a unique experience for you.",
  },
];

// Hero slider images
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1716117626586-538233aaf9ae?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 1",
  },
  {
    src: "https://images.unsplash.com/photo-1599632740188-8a4f152a8342?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 2",
  },
  {
    src: "https://images.unsplash.com/photo-1684235423897-4e630a4f1e52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 3",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1661901647310-4deafc6f29a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 1",
  },
];

const Page = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Image Slider */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover brightness-[0.85]"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20">
          <div className="container mx-auto h-full flex items-center">
            <div className="max-w-2xl text-white p-6 md:p-0">
              <span className="bg-blue-600/80 text-white px-4 py-1 rounded-full text-sm uppercase tracking-wider montserrat font-medium">
                Discover India
              </span>
              <h1 className="font-extrabold text-5xl md:text-7xl tracking-wide playfair leading-tight mt-6">
                We are <br />
                <span className="relative inline-block">
                  Raju India
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-500/30 -z-10"></span>
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl montserrat font-light max-w-xl">
                Discover the soul and essence of India with our expertly curated
                travel experiences since 1995.
              </p>
            </div>
          </div>

          {/* Slider Navigation Dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="container mx-auto py-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start px-6 md:px-0">
          <div className="md:flex-[4]">
            <div className="relative">
              <h2 className="font-extrabold text-zinc-900 text-4xl md:text-5xl tracking-wide playfair leading-tight">
                Authentic <br />
                Indian Experiences
              </h2>
              <span className="bg-blue-100 absolute bottom-[-10px] z-[-1] w-[180px] h-[30px]"></span>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg playfair">Since 1995</h3>
                <p className="text-zinc-600 montserrat text-sm">
                  Decades of experience creating memorable journeys
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg playfair">Local Experts</h3>
                <p className="text-zinc-600 montserrat text-sm">
                  Born and raised in India with deep cultural knowledge
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg playfair">Personalized</h3>
                <p className="text-zinc-600 montserrat text-sm">
                  Tailor-made journeys for families, solo travelers & more
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg playfair">India & Nepal</h3>
                <p className="text-zinc-600 montserrat text-sm">
                  Comprehensive coverage of diverse destinations
                </p>
              </div>
            </div>
          </div>

          <div className="md:flex-[6] flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 items-center">
              <h4 className="playfair uppercase font-extrabold text-2xl">
                About Us
              </h4>
              <hr className="h-[2px] w-[100px] border-none bg-black mt-1" />
            </div>

            <p className="montserrat text-zinc-700 leading-relaxed">
              IRI is a travel company founded since 1995 with an on-site
              director and a team working to keep the logistics seamless as
              possible with human treatment, for every single one of our
              clients. A group of experts born and raised in India, versed in
              history, art, architecture, philosophy, religion and gastronomy
              with compelling backgrounds, will offer you a memorable trip
              converted into a real personal journey.
            </p>

            <p className="font-semibold text-lg text-blue-800 playfair leading-relaxed">
              Specialized on: Friends & Family, Solo Female and Educational
              traveling. Unique Honeymoons, Corporate, Tailor Made, and One of a
              Kind Journeys. We offer as well, the possibility to rent a car
              with personal driver, a full service of safe, worry-free journeys
              and destinations around India and Nepal, delivering unforgettable
              moments for you and your groups.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-bold playfair text-blue-800">
                  Family Tours
                </h5>
                <p className="text-sm montserrat mt-2">
                  Engaging experiences for all ages with child-friendly
                  activities
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-bold playfair text-blue-800">
                  Solo Female
                </h5>
                <p className="text-sm montserrat mt-2">
                  Safe, enriching journeys designed for women traveling alone
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-bold playfair text-blue-800">
                  Educational
                </h5>
                <p className="text-sm montserrat mt-2">
                  Immersive cultural learning experiences for students and
                  groups
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-zinc-50 py-20">
        <div className="container mx-auto px-6 md:px-0">
          <div className="max-w-[800px] text-center mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-1 bg-blue-500"></div>
            </div>
            <p className="playfair text-xl md:text-2xl font-bold tracking-wide text-zinc-800 leading-relaxed">
              Multi lingual tour guides, art historians, skilled drivers, and
              western travel cultural curators are intertwined to provide -off
              the beaten path- travel destinations with unique experiences. A
              friendly, respectful and supportive staff from the minute you
              contact us, till the moment you go back home. Hospitality and open
              hands define us.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-16 h-1 bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="container mx-auto py-20 px-6 md:px-0">
        <div className="text-center mb-16">
          <h2 className="playfair font-bold text-4xl">Popular Destinations</h2>
          <p className="montserrat text-zinc-600 mt-4 max-w-2xl mx-auto">
            Discover our most sought-after locations across India and Nepal,
            each offering unique cultural experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Taj Mahal, Agra",
              image:
                "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
              description:
                "Marvel at one of the world's most beautiful monuments to love",
            },
            {
              name: "Varanasi",
              image:
                "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1000&auto=format&fit=crop",
              description:
                "Experience spiritual awakening in India's oldest living city",
            },
            {
              name: "Jaipur",
              image:
                "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
              description:
                "Explore the Pink City's majestic palaces and vibrant bazaars",
            },
          ].map((destination, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="font-bold text-xl playfair">
                    {destination.name}
                  </h3>
                  <p className="montserrat text-sm mt-2">
                    {destination.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 playfair">
            View All Destinations
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-zinc-50 py-20">
        <div className="container mx-auto px-6 md:px-0">
          <div className="text-center mb-16">
            <h2 className="playfair font-bold text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="montserrat text-zinc-600 mt-4 max-w-2xl mx-auto">
              Find answers to common questions about traveling with Raju India
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-zinc-200 rounded-lg overflow-hidden bg-white"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-zinc-50">
                    <span className="text-left font-medium playfair text-lg">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 montserrat text-zinc-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="container mx-auto px-6 md:px-0">
          <div className="text-center mb-16">
            <h2 className="playfair font-bold text-4xl">Meet Our Team</h2>
            <p className="montserrat text-zinc-600 mt-4 max-w-2xl mx-auto">
              Our experienced guides and travel experts are passionate about
              sharing the beauty and culture of India
            </p>
          </div>
          <div className="max-w-[1000px] mx-auto">
            <TeamGrid />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop"
            alt="India Travel"
            fill
            className="object-cover brightness-[0.4]"
          />
        </div>
        <div className="container mx-auto px-6 md:px-0 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="playfair font-bold text-4xl md:text-5xl">
              Begin Your Indian Journey
            </h2>
            <p className="montserrat mt-6 text-lg">
              Let us create a personalized travel experience that will immerse
              you in the rich culture, history, and beauty of India
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-800 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition-all duration-300 playfair">
                Contact Us
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-all duration-300 playfair">
                View Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Page;
