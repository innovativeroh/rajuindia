"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "@/../public/img/logo.png";
import InvertLogo from "@/../public/img/invlogo.png";
import { MdOutlineArrowRight } from "react-icons/md";

const navLinks = [
  { name: "About", href: "/" },
  { name: "Travel Experiences", href: "/destinations" },
  { name: "Testimonials", href: "/blog" },
  { name: "Blog", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Handle scroll effect only on the home page
  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setScrolled(window.scrollY > 20);
      } else {
        // Always set to true for other pages to keep it fixed at top
        setScrolled(true);
      }
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage && !scrolled 
          ? "bg-white/10 text-white backdrop-blur-2xl px-5 py-3 mt-4 max-w-[1300px] m-auto rounded-full"
          : "bg-white shadow-lg py-2"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-[140px] md:w-[180px] transition-all duration-300">
              <Image
                src={isHomePage && !scrolled ? InvertLogo : Logo}
                alt="Foxico Logo"
                width={1000}
                height={300}
                priority
                className="w-full h-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Now in the middle */}
          <nav className="hidden md:flex items-center playfair justify-center space-x-8 flex-1 mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex gap-[0.2] items-center font-medium hover:text-yellow-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-500 after:transition-all hover:after:w-full ${
                  isHomePage && !scrolled ? "text-white" : "text-gray-800"
                }`}
              >
                {link.name}
                {link.name === "About" && (
                  <MdOutlineArrowRight className="text-yellow-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="#"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all py-2.5 px-5 font-bold flex items-center gap-2 italic rounded-lg text-white text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Plan Journey <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors ${
              isHomePage && !scrolled ? "text-white hover:bg-white/20" : "text-gray-800"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-yellow-500 transition-colors py-2 border-b border-gray-100 flex justify-between items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ArrowRight size={14} className="text-yellow-500" />
              </Link>
            ))}
            <div className="pt-4 mt-2">
              <Link
                href="#"
                className="bg-yellow-500 hover:bg-yellow-600 transition-all py-3 px-4 font-bold flex items-center justify-center gap-2 italic rounded-lg text-white text-sm w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Request Tailor Made Journey <ArrowRight size={15} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}