import React from "react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiHelpCircle,
  FiSend
} from "react-icons/fi";
import { NextPage } from "next";

const ContactPage: NextPage = () => {
  return (
    <>
      <Navbar />
      <main className="mt-24 px-4">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto pt-10 pb-12">
          <h1 className="font-extrabold text-5xl mb-4 text-gray-800 playfairDisplay">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl montserrat">
            We would love to hear from you! Whether you have a question about
            our services, pricing, or anything else, our team is ready to answer
            all your questions.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 - General Inquiries */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <div className="mb-4 text-blue-500 bg-blue-50 p-3 inline-flex items-center justify-center rounded-xl">
              <FiMail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 playfair text-gray-800">
              General Inquiries
            </h3>
            <p className="text-gray-600 mb-4 flex-grow montserrat">
              For general questions about our services or company
            </p>
            <a
              href="mailto:info@company.com"
              className="text-blue-500 hover:text-blue-700 font-medium flex items-center group montserrat"
            >
              info@company.com
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Card 2 - Customer Support */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <div className="mb-4 text-green-500 bg-green-50 p-3 inline-flex items-center justify-center rounded-xl">
              <FiHelpCircle className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800 playfair">
              Customer Support
            </h3>
            <p className="text-gray-600 mb-4 flex-grow montserrat">
              Need help with your account or our services?
            </p>
            <a
              href="mailto:support@company.com"
              className="text-green-500 hover:text-green-700 font-medium flex items-center group montserrat"
            >
              support@company.com
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Card 3 - Phone */}
          <div className="bg-purple-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <div className="mb-4 text-purple-500 bg-purple-50 p-3 inline-flex items-center justify-center rounded-xl">
              <FiPhone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800 playfair">
              Call Us
            </h3>
            <p className="text-gray-600 mb-4 flex-grow montserrat">
              Mon-Fri: 9:00 AM - 5:00 PM EST
            </p>
            <a
              href="tel:+1-800-123-4567"
              className="text-purple-500 hover:text-purple-700 font-medium flex items-center group montserrat"
            >
              +1 (800) 123-4567
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Card 4 - Address */}
          <div className="bg-amber-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <div className="mb-4 text-amber-500 bg-amber-50 p-3 inline-flex items-center justify-center rounded-xl">
              <FiMapPin className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-xl mb-2 text-gray-800 playfair">
              Visit Us
            </h3>
            <p className="text-gray-600 mb-2 flex-grow montserrat">
              123 Business Street, New York, NY 10001
            </p>
            <a
              href="https://goo.gl/maps/YourLocationLink"
              className="text-amber-500 hover:text-amber-700 font-medium flex items-center group montserrat"
            >
              Get Directions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Form and Map Side by Side */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 playfair">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 font-medium text-gray-700 montserrat"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-medium text-gray-700 montserrat"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 border montserrat border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 montserrat font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 border montserrat border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 montserrat font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 montserrat text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 font-medium"
                  >
                    <span>Send Message</span>
                    <FiSend className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col mb-10">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 playfair">
                Our Location
              </h2>
              <div className="flex-grow rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1679939076314!5m2!1sen!2sca"
                  className="w-full h-full min-h-64"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-xl mb-2 text-gray-800 playfair">
                  Headquarters
                </h3>
                <p className="text-gray-600 montserrat">123 Business Street, Suite 100</p>
                <p className="text-gray-600 montserrat">New York, NY 10001</p>
                <p className="text-gray-600 mt-2 montserrat">
                  Monday - Friday: 9am - 5pm EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
