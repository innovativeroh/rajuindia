"use client"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import { PortableText, type PortableTextReactComponents } from "@portabletext/react"
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaArrowLeft } from "react-icons/fa"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MarqueeSlider } from "@/components/marquee"

// Sanity configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
})

// Image URL builder
const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageAsset) {
  return builder.image(source)
}

// Type definitions
interface SanityImageAsset {
  url: string
  alt?: string
  _ref?: string
  asset?: {
    _ref?: string
  }
}

interface Author {
  name: string
  bio?: PortableTextBlock[]
  image?: SanityImageAsset
}

interface PortableTextBlock {
  _type: string
  children: PortableTextChild[]
  style?: string
}

interface PortableTextChild {
  _type: string
  text?: string
  marks?: string[]
}

interface BlogPost {
  _id: string
  title: string
  slug: string
  author: Author
  mainImage?: SanityImageAsset
  location?: string
  categories: { title: string; _id: string }[]
  publishedAt: string
  body: PortableTextBlock[]
}

// Custom PortableText components
const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-display font-semibold text-primary-dark mb-5">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-display font-medium text-primary-dark mb-4">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-light pl-4 italic my-6 text-gray-600 py-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-4 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-4 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-medium hover:text-primary-dark underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold text-primary-dark">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="my-8 w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(value.asset).url() || "/placeholder.svg"}
            alt={value.alt || "Blog post image"}
            width={1200}
            height={700}
            className="w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {value.caption && <p className="text-center text-sm text-gray-500 mt-2 italic">{value.caption}</p>}
        </div>
      )
    },
  },
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
`

export default function TravelBlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Handle going back to blogs page
  const handleGoBackToBlogs = () => {
    router.push('/blogs')
  }

  useEffect(() => {
    async function fetchBlogPost() {
      if (!params?.slug) {
        setError("No slug provided")
        setLoading(false)
        return
      }

      try {
        const blogPost = await client.fetch<BlogPost>(BLOG_POST_QUERY, {
          slug: params.slug,
        })

        if (!blogPost) {
          setError("Blog post not found")
          setLoading(false)
          return
        }

        setPost(blogPost)
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch blog post:", err)
        setError("Failed to load blog post")
        setLoading(false)
      }
    }

    fetchBlogPost()
  }, [params?.slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse text-primary-medium">Loading your travel story...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-500">
        {error}
        <button 
          onClick={handleGoBackToBlogs}
          className="mt-4 flex items-center justify-center mx-auto bg-primary-medium hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" /> Back to Blogs
        </button>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <>
      <Navbar />
      <article className="max-w-6xl mx-auto px-4 py-12 bg-white relative mt-[50px]">
        {/* Go Back Button - Positioned Absolutely */}
        <button 
          onClick={handleGoBackToBlogs}
          className="flex gap-2 text-white bg-blue-900 py-2 px-4 rounded-lg mb-5 shadow-xl"
          aria-label="Go back to blogs"
        >
          <FaArrowLeft className="w-5 h-5 text-primary-medium group-hover:transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium hidden md:inline">Back to Blogs</span>
        </button>

        {/* Main Image with Title Overlay */}
        {post.mainImage && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={urlFor(post.mainImage).url() || "/placeholder.svg"}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Title Text Over Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              {/* Category Tags */}
              <div className="inline-block">
              <div className="flex flex-wrap bg-white/20 rounded-xl gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="bg-primary-light/30 text-white px-3 py-1 rounded-full text-xs uppercase tracking-wider backdrop-blur-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              </div>
              {/* Blog Title */}
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 text-shadow">{post.title}</h1>

              {/* Post Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>

                {/* Publication Date */}
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Location */}
                {post.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>{post.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="prose max-w-none">
          <PortableText value={post.body} components={components} />
        </div>

        {/* Author Bio and Related Posts */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 p-6 rounded-lg">
            {post.author.image && (
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(post.author.image).url() || "/placeholder.svg"}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-display font-semibold text-primary-dark mb-2">Posted by {post.author.name}</h3>
              {post.author.bio ? (
                <div className="text-gray-700 text-sm">
                  <PortableText value={post.author.bio} components={components} />
                </div>
              ) : (
                <p className="text-gray-700 text-sm">
                  Travel enthusiast and storyteller sharing adventures from around the world.
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
      <MarqueeSlider />
      <Footer />
    </>
  )
}