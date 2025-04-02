"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  Mountain,
  Building,
  Globe,
  Plane,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

const DreamJourneySection: React.FC<unknown> = () => {
  const [animateBackground, setAnimateBackground] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [tripLength, setTripLength] = useState(14);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    guests: "",
    tripType: "",
    festival: "",
    places: "",
    travelMonth: "",
    travelStyle: "",
    specifics: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const sliderImages = [
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1469474968028-5663bfa1b212",
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071",
  ];

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setAnimateBackground((prev) => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(bgInterval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [sliderImages.length]);

  const iconComponents = [
    Globe,
    MapPin,
    Plane,
    Calendar,
    Star,
    Heart,
    Mountain,
    Building,
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, tripLength }),
      });

      if (response.ok) {
        setSubmitStatus("Form submitted successfully! Check your email.");
        setFormData({
          name: "",
          email: "",
          country: "",
          phone: "",
          guests: "",
          tripType: "",
          festival: "",
          places: "",
          travelMonth: "",
          travelStyle: "",
          specifics: "",
        });
        setTripLength(14);
      } else {
        setSubmitStatus("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("An error occurred. Please try again later.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden mt-10">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundSize: "200% 200%",
            backgroundPosition: `${animateBackground}% ${animateBackground}%`,
            transition: "background-position 0.5s ease",
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
          <div className="absolute top-60 right-40 w-40 h-40 rounded-full bg-purple-200 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold playfair bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 bg-clip-text text-transparent mb-6">
              Let us know about your dream or need.
            </h1>
            <p className="text-xl text-gray-700 mb-10 montserrat max-w-2xl mx-auto">
              We will convert it into a memorable journey. Please fill in this
              form so we can start planning your dream journey.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto mb-24">
            <div className="relative">
              <motion.div
                className="absolute -top-16 -right-12 w-24 h-24 rounded-xl bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 shadow-xl rotate-12 opacity-80 z-0 hidden md:block"
                animate={{ rotate: [12, 15, 12], y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="absolute inset-1 bg-white/90 rounded-lg flex items-center justify-center">
                  <Globe className="text-blue-500 h-10 w-10" />
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-10 -left-8 w-20 h-20 rounded-xl bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 shadow-xl -rotate-12 opacity-80 z-0 hidden md:block"
                animate={{ rotate: [-12, -6, -12], y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              >
                <div className="absolute inset-1 bg-white/90 rounded-lg flex items-center justify-center">
                  <Plane className="text-blue-500 h-8 w-8" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-md">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      <div className="p-8 md:p-12">
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold playfair text-gray-800 mb-2">
                            Plan Your Dream Journey
                          </h2>
                          <p className="text-gray-600 montserrat">
                            Fill out the details below to get started.
                          </p>
                        </div>

                        <form className="space-y-8" onSubmit={handleSubmit}>
                          {/* Personal Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700">
                                  Your Name
                                </Label>
                                <Input
                                  id="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  placeholder="Enter your full name"
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="email"
                                  className="text-gray-700"
                                >
                                  Email Address
                                </Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="you@example.com"
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="country"
                                  className="text-gray-700"
                                >
                                  Select Your Country
                                </Label>
                                <Select
                                  onValueChange={(value) =>
                                    handleSelectChange("country", value)
                                  }
                                  value={formData.country}
                                >
                                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                    <SelectValue placeholder="Select your country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {countries.map((country) => (
                                      <SelectItem key={country} value={country}>
                                        {country}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="phone"
                                  className="text-gray-700"
                                >
                                  Phone Number
                                </Label>
                                <Input
                                  id="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="+1 (555) 000-0000"
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Trip Details */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              Trip Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="guests"
                                  className="text-gray-700"
                                >
                                  Number of Guests
                                </Label>
                                <div className="flex">
                                  <Input
                                    id="guests"
                                    type="number"
                                    min="1"
                                    value={formData.guests}
                                    onChange={handleInputChange}
                                    placeholder="2"
                                    className="rounded-r-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  <Button
                                    type="button"
                                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-l-none border border-l-0 border-gray-300"
                                  >
                                    <Users className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="tripType"
                                  className="text-gray-700"
                                >
                                  How Do You Define Your Trip
                                </Label>
                                <Select
                                  onValueChange={(value) =>
                                    handleSelectChange("tripType", value)
                                  }
                                  value={formData.tripType}
                                >
                                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                    <SelectValue placeholder="Select trip type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="friends-family">
                                      Friends and Family
                                    </SelectItem>
                                    <SelectItem value="solo-female">
                                      Solo Female
                                    </SelectItem>
                                    <SelectItem value="educational">
                                      Educational
                                    </SelectItem>
                                    <SelectItem value="corporate">
                                      Corporate
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label
                                  htmlFor="festival"
                                  className="text-gray-700"
                                >
                                  Interested in an Indian Festival?
                                </Label>
                                <Select
                                  onValueChange={(value) =>
                                    handleSelectChange("festival", value)
                                  }
                                  value={formData.festival}
                                >
                                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="not-particularly">
                                      Not Particularly
                                    </SelectItem>
                                    <SelectItem value="holi">
                                      Holi Festival
                                    </SelectItem>
                                    <SelectItem value="pushkar">
                                      Pushkar Camel Festival
                                    </SelectItem>
                                    <SelectItem value="kumbh">
                                      Kumbh Mela
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          {/* Travel Preferences */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              Travel Preferences
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="places"
                                  className="text-gray-700"
                                >
                                  Desired Places to Visit
                                </Label>
                                <Textarea
                                  id="places"
                                  value={formData.places}
                                  onChange={handleInputChange}
                                  placeholder="Describe the places you'd like to visit..."
                                  rows={4}
                                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="travelMonth"
                                    className="text-gray-700"
                                  >
                                    Preferred Month and Year of Travel
                                  </Label>
                                  <Input
                                    id="travelMonth"
                                    type="month"
                                    value={formData.travelMonth}
                                    onChange={handleInputChange}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label
                                    htmlFor="travelStyle"
                                    className="text-gray-700"
                                  >
                                    Desired Travel Style
                                  </Label>
                                  <Select
                                    onValueChange={(value) =>
                                      handleSelectChange("travelStyle", value)
                                    }
                                    value={formData.travelStyle}
                                  >
                                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                      <SelectValue placeholder="Select travel style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="luxury">
                                        Luxury
                                      </SelectItem>
                                      <SelectItem value="semi-luxury">
                                        Semi Luxury
                                      </SelectItem>
                                      <SelectItem value="affordable">
                                        Affordable
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="tripLength"
                                  className="text-gray-700"
                                >
                                  Desired Length of the Trip ({tripLength} Days)
                                </Label>
                                <Slider
                                  id="tripLength"
                                  min={1}
                                  max={100}
                                  step={1}
                                  value={[tripLength]}
                                  onValueChange={(value) =>
                                    setTripLength(value[0])
                                  }
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Additional Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              Additional Information
                            </h3>
                            <div className="space-y-2">
                              <Label
                                htmlFor="specifics"
                                className="text-gray-700"
                              >
                                Any Specifics to Consider?
                              </Label>
                              <Textarea
                                id="specifics"
                                value={formData.specifics}
                                onChange={handleInputChange}
                                placeholder="Let us know any specific requirements..."
                                rows={4}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            {isSubmitting
                              ? "Submitting..."
                              : "Start Planning My Journey"}
                          </Button>
                          {submitStatus && (
                            <p
                              className={`text-center mt-4 ${
                                submitStatus.includes("success")
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {submitStatus}
                            </p>
                          )}
                        </form>
                      </div>

                      <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0">
                          {sliderImages.map((src, index) => (
                            <motion.div
                              key={index}
                              className="absolute inset-0"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: index === currentImage ? 0.7 : 0,
                              }}
                              transition={{ duration: 1 }}
                            >
                              <Image
                                src={src}
                                alt={`Slide ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                              />
                            </motion.div>
                          ))}
                          <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40" />
                        </div>

                        <div className="absolute inset-0 opacity-20">
                          <div className="grid grid-cols-3 grid-rows-3 h-full">
                            {Array(9)
                              .fill(0)
                              .map((_, i) => {
                                const IconComponent =
                                  iconComponents[i % iconComponents.length];
                                return (
                                  <motion.div
                                    key={i}
                                    className="flex items-center justify-center"
                                    animate={{
                                      scale: [1, 1.1, 1],
                                      opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                      duration: 3 + (i % 3),
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                      delay: i * 0.2,
                                    }}
                                  >
                                    <IconComponent className="text-white h-10 w-10" />
                                  </motion.div>
                                );
                              })}
                          </div>
                        </div>

                        <div className="relative z-10 text-center p-8">
                          <h3 className="text-3xl font-bold text-white mb-4">
                            Journey Beyond Expectations
                          </h3>
                          <p className="text-blue-100 mb-8 max-w-xs mx-auto">
                            Our travel experts will transform your ideas into a
                            perfectly tailored experience.
                          </p>

                          <div className="flex flex-wrap justify-center gap-3 mb-6">
                            {[
                              "Adventure",
                              "Relaxation",
                              "Culture",
                              "Nature",
                            ].map((tag) => (
                              <span
                                key={tag}
                                className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1 text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex justify-center">
                            <div className="flex -space-x-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 border-2 border-white flex items-center justify-center text-blue-800 font-medium text-xs"
                                >
                                  {String.fromCharCode(64 + i)}
                                </div>
                              ))}
                              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600">
                                <Plus className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                          <p className="text-blue-100 text-sm mt-2">
                            Join 10,000+ happy travelers
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DreamJourneySection;
