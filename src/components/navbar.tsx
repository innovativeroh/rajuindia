"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Logo from "@/../public/img/logo.png"
import InvertLogo from "@/../public/img/invlogo.png"
import { MdOutlineArrowRight } from "react-icons/md"

const navLinks = [
  { name: "About", href: "/" },
  { name: "Travel Experiences", href: "/destinations" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Blog", href: "/blogs" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Handle scroll effect only on the home page
  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setScrolled(window.scrollY > 20)
      } else {
        // Always set to true for other pages to keep it fixed at top
        setScrolled(true)
      }
    }

    // Set initial state
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isHomePage && !scrolled
            ? "bg-white/10 text-white backdrop-blur-2xl px-5 py-3 lg:mt-4 max-w-[1300px] m-auto lg:rounded-full"
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
                  {link.name === "About" && <MdOutlineArrowRight className="text-yellow-500" />}
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
              className={`md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors z-50 ${
                isMenuOpen
                  ? "text-gray-800 hover:bg-gray-100"
                  : isHomePage && !scrolled
                    ? "text-white hover:bg-white/20"
                    : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar with Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[350px] bg-white shadow-xl z-50 md:hidden transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto pt-20 pb-6 px-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-800 hover:text-yellow-500 transition-colors py-3 border-b border-gray-100 flex justify-between items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ArrowRight size={14} className="text-yellow-500" />
              </Link>
            ))}
            <div className="pt-6 mt-2">
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
    </>
  )
}

