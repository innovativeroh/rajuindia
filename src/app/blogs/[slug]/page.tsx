"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { MapPin, Calendar, User } from 'lucide-react'
import Navbar from '@/components/navbar'

// Sanity configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageAsset) {
  return builder.image(source);
}

// Type definitions
interface SanityImageAsset {
  url: string;
  alt?: string;
}

interface Author {
  name: string;
  bio?: PortableTextBlock[];
  image?: SanityImageAsset;
}

interface PortableTextBlock {
  _type: string;
  children: PortableTextChild[];
  style?: string;
}

interface PortableTextChild {
  _type: string;
  text?: string;
  marks?: string[];
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: Author;
  mainImage?: SanityImageAsset;
  location?: string;
  categories: { title: string; _id: string }[];
  publishedAt: string;
  body: PortableTextBlock[];
}

// Custom PortableText components
const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({children}) => <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">{children}</h2>,
    h2: ({children}) => <h3 className="text-2xl md:text-3xl font-display font-semibold text-primary-dark mb-5">{children}</h3>,
    h3: ({children}) => <h4 className="text-xl md:text-2xl font-display font-medium text-primary-dark mb-4">{children}</h4>,
    normal: ({children}) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-primary-light pl-4 italic my-6 text-gray-600 py-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-5 my-4 text-gray-700">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-5 my-4 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="mb-2">{children}</li>,
    number: ({children}) => <li className="mb-2">{children}</li>,
  },
  marks: {
    link: ({children, value}) => (
      <a 
        href={value.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary-medium hover:text-primary-dark underline"
      >
        {children}
      </a>
    ),
    strong: ({children}) => <strong className="font-bold text-primary-dark">{children}</strong>,
    em: ({children}) => <em className="italic text-gray-600">{children}</em>,
  },
  types: {
    image: ({value}) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(value.asset).url()}
            alt={value.alt || 'Blog post image'}
            width={1200}
            height={700}
            className="w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    }
  }
}

// GROQ query to fetch a specific blog post
const BLOG_POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    author-> {
      name,
      bio,
      image
    },
    mainImage,
    location,
    categories[]->{
      title,
      _id
    },
    publishedAt,
    body
  }
`;

export default function TravelBlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!params?.slug) {
        setError("No slug provided");
        setLoading(false);
        return;
      }

      try {
        const blogPost = await client.fetch<BlogPost>(BLOG_POST_QUERY, {
          slug: params.slug
        });

        if (!blogPost) {
          setError("Blog post not found");
          setLoading(false);
          return;
        }

        setPost(blogPost);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Failed to load blog post");
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse text-primary-medium">
          Loading your travel story...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
    <Navbar />
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white">
      {/* Header Section with Travel-Inspired Design */}
      <header className="text-center mb-12">
        {/* Category Tags */}
        <div className="flex justify-center mb-4 space-x-2">
          {post.categories.map((category) => (
            <span 
              key={category._id} 
              className="bg-primary-light/20 text-primary-dark px-3 py-1 rounded-full text-xs uppercase tracking-wider"
            >
              {category.title}
            </span>
          ))}
        </div>

        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-dark mb-6">
          {post.title}
        </h1>

        {/* Post Metadata */}
        <div className="flex justify-center items-center space-x-6 text-gray-600 mb-6">
          {/* Author */}
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary-medium" />
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>

          {/* Publication Date */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary-medium" />
            <span className="text-sm">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Location */}
          {post.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary-medium" />
              <span className="text-sm">{post.location}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Image with Overlay */}
      {post.mainImage && (
        <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Optional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        </div>
      )}

      {/* Blog Content with Travel-Inspired Typography */}
      <div className="prose max-w-none">
        <PortableText 
          value={post.body} 
          components={components} 
        />
      </div>

      {/* Optional: Related Posts or Call to Action */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-xl font-display text-primary-dark">
          Inspired by this journey? Start planning your next adventure!
        </p>
      </div>
    </article>
    </>
  )
}