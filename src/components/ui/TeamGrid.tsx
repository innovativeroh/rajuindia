"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  attributes: string[]
  imageUrl: string
  bio?: string
  social?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

interface TeamGridProps {
  title?: string
  subtitle?: string
  teamMembers?: TeamMember[]
}

export default function TeamGrid({
  title = "Our Team",
  subtitle = "Meet the amazing people behind our success",
  teamMembers = [
    {
      id: "1",
      name: "Raju Singh",
      attributes: ["Founder", "On-site Director", "Warrior", "The Leader"],
      imageUrl: "/team/5ec84ba84eaf6-mr-raju.jpg",
      bio: "Passionate leader with a vision for excellence.",
      social: {
        linkedin: "https://linkedin.com/in/rajusingh",
        twitter: "https://twitter.com/rajusingh",
        email: "raju@example.com",
      },
    },
    {
      id: "2",
      name: "Devender",
      attributes: ["Man Behind The Scenes", "Right Hand", "The Strategist"],
      imageUrl: "/team/5ed54c5dea371-devender.jpg",
      social: {
        linkedin: "https://linkedin.com/in/devender",
        email: "devender@example.com",
      },
    },
    {
      id: "3",
      name: "Shekhar",
      attributes: ["Key person for logistics", "Mutton Dish Specialist", "The Rescuer"],
      imageUrl: "/team/5ed54c6fb0fd6-shekar.jpg",
      social: {
        email: "shekhar@example.com",
      },
    },
    {
      id: "4",
      name: "Rocio",
      attributes: [
        "Art & Cultural Travel Curator",
        "Adventurous Traveller",
        "Mexican with Indian Heart",
        "The Loving Bird",
      ],
      imageUrl: "/team/5ec84c3cdfe04-rocio.jpg",
      social: {
        twitter: "https://twitter.com/rocio",
        email: "rocio@example.com",
      },
    },
    {
      id: "5",
      name: "Mafalda",
      attributes: ["Art & Cultural Travel Curator", "Made in Mexico", "India Devoted", "The Passionate"],
      imageUrl: "/team/5ed54c3f194e0-mafalda.jpg",
      social: {
        linkedin: "https://linkedin.com/in/mafalda",
        email: "mafalda@example.com",
      },
    },
    {
      id: "6",
      name: "Anu",
      attributes: ["Artistic Eye", "Music Adviser", "The Innovator"],
      imageUrl: "/team/5ed54c7d28785-anu.jpg",
      social: {
        twitter: "https://twitter.com/anu",
        email: "anu@example.com",
      },
    },
  ],
}: TeamGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="bg-gradient-to-b py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl font-bold text-blue-950 playfair mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={index}
              isActive={activeId === member.id}
              onMouseEnter={() => setActiveId(member.id)}
              onMouseLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TeamMemberCardProps {
  member: TeamMember
  index: number
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function TeamMemberCard({ member, index, isActive, onMouseEnter, onMouseLeave }: TeamMemberCardProps) {
  return (
    <motion.div
      className="group flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image Container */}
      <div className="relative w-64 h-64 mb-6 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-blue-950/10 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
          <Image
            src={member.imageUrl || "/placeholder.svg"}
            alt={`Photo of ${member.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-full"
            priority={index < 3} // Prioritize loading first 3 images
          />
        </motion.div>

        {/* Social Icons */}
        {member.social && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-2 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {member.social.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-2 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300"
                  aria-label={`${member.name}'s Twitter profile`}
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {member.social.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  className="bg-white rounded-full p-2 text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div className="text-center" animate={{ y: isActive ? -5 : 0 }} transition={{ duration: 0.3 }}>
        <h3 className="text-3xl font-medium text-blue-950 playfair mb-3">{member.name}</h3>

        <div className="space-y-1 mb-3">
          {member.attributes.map((attribute, idx) => (
            <p key={idx} className="text-gray-600 text-sm font-medium">
              {attribute}
            </p>
          ))}
        </div>

        {member.bio && (
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {member.bio}
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

