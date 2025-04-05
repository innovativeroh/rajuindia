import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"
import Logo from "@/../public/img/logo.png"

// Define types for social links
interface SocialLinks {
  facebook: string
  instagram: string
  linkedin: string
  youtube: string
}

// Define types for sitemap links
interface SitemapLink {
  href: string
  label: string
}

export function Footer() {
  const socialLinks: SocialLinks = {
    facebook: "https://www.facebook.com/rajuindia",
    instagram: "https://www.instagram.com/rajuindia",
    linkedin: "https://www.linkedin.com/company/rajuindia",
    youtube: "https://www.youtube.com/@rajuindia"
  }

  const sitemapLinks: SitemapLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/plan", label: "Plan Journey" }
  ]

  return (
    <footer className="border-t border-gray-200 py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              <Image 
                src={Logo} 
                width={180} 
                alt="Foxico Logo"
                priority
              />
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link 
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link 
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link 
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-800 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link 
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>

        {/* Sitemap Links */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 md:gap-6">
          {sitemapLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-gray-600 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Privacy, Terms, and Copyright */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-600 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Raju India. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}