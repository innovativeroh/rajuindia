import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Logo from "@/../public/img/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Useful Links */}
          <div>
            <h3 className="font-medium text-sm mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h3 className="font-medium text-sm mb-4">Careers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-sm mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Social Media
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-medium text-sm mb-4">Subscribe</h3>
            <p className="text-sm text-gray-600 mb-3">Join our community to receive updates</p>
            <div className="flex mb-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none border-r-0 bg-gray-100 focus:bg-white"
              />
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing, you agree to our{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold">
                <Image src={Logo} width={180} alt="" />
              </Link>
            </div>

            <div className="flex space-x-4 mb-4 md:mb-0">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="#" className="text-xs text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-600 hover:text-gray-900">
                Cookie Policy
              </Link>
            </div>
            <div className="text-xs text-gray-500">© 2025 Raju India. All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

