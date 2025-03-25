"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";

// Type definitions (unchanged)
interface Category {
  _id: string;
  title: string;
}

interface Author {
  _id: string;
  name: string;
}

interface SanityImageAsset {
  _id: string;
  url: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: Author;
  mainImage?: {
    asset: SanityImageAsset;
    alt?: string;
  };
  categories: Category[];
  publishedAt: string;
  body: string;
}

// Sanity client configuration (unchanged)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true
});

const builder = imageUrlBuilder(client);
const urlFor = (source: BlogPost["mainImage"]) =>
  source?.asset
    ? builder.image(source.asset).width(600).fit("max").auto("format").url()
    : "";

// GROQ query (unchanged)
const BLOG_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    author-> {
      _id,
      name
    },
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title
    },
    publishedAt,
    "body": body[0].children[0].text
  }
`;

const BlogArchive: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        if (
          !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
          !process.env.NEXT_PUBLIC_SANITY_DATASET
        ) {
          throw new Error("Missing Sanity environment variables");
        }
        const posts: BlogPost[] = await client.fetch(BLOG_POSTS_QUERY);
        setBlogPosts(posts);
        setLoading(false);
      } catch (err: unknown) {
        console.error("Fetch error:", err);
        setError(
          `Failed to load blog posts: ${err instanceof Error ? err.message : "Unknown error"}`
        );
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filteredResults = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories.some((category) =>
          category.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setSearchResults(filteredResults);
    if (isSearchFocused) setShowSearchResults(true);
  }, [searchQuery, blogPosts, isSearchFocused]);

  const handleLoadMore = () => setDisplayedPosts((prev) => prev + 3);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchResults(false);
  };
  const getFeaturedPosts = () => blogPosts.slice(0, 3);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-lg text-blue-900">Loading epic stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-red-800 font-medium mb-2">
            Oops, something broke!
          </h3>
          <p className="text-red-600">{error}</p>
          <Button
            variant="outline"
            className="mt-4 border-red-300 text-red-700 hover:bg-red-50"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const filteredPosts =
    searchQuery.trim() !== ""
      ? blogPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.categories.some((category) =>
              category.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      : blogPosts;

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        {/* Header with Search */}
        <div className="relative h-[450px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1523544261025-3159599b1fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Travel the World"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-600/30 flex flex-col items-center justify-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg playfair"
            >
              Blogs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white max-w-2xl text-center mt-4 drop-shadow-md"
            >
              Dive into a world of breathtaking destinations and unforgettable
              stories.
            </motion.p>
            {/* Search Bar in Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 w-full max-w-lg relative"
              ref={searchRef}
            >
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex-1">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Find your next adventure..."
                    className="pl-12 pr-4 py-3 w-full rounded-full bg-white/90 border-none text-gray-800 placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
                  <AnimatePresence>
                    {showSearchResults && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full bg-white rounded-lg shadow-xl mt-2 max-h-80 overflow-auto border border-blue-100"
                      >
                        {searchResults.map((post) => (
                          <Link
                            key={post._id}
                            href={`/blogs/${post.slug}`}
                            className="flex items-start gap-3 p-3 hover:bg-blue-50 border-b last:border-0"
                            onClick={() => setShowSearchResults(false)}
                          >
                            {post.mainImage?.asset && (
                              <div className="relative h-12 w-12 flex-shrink-0 rounded overflow-hidden">
                                <Image
                                  src={
                                    urlFor(post.mainImage) || "/placeholder.svg"
                                  }
                                  alt={post.mainImage.alt || post.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {post.title}
                              </div>
                              <div className="text-xs text-blue-600 mt-1">
                                {post.categories
                                  .map((cat) => cat.title)
                                  .join(", ")}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  type="submit"
                  className="ml-2 rounded-full bg-blue-600 hover:bg-blue-700 py-3 px-6 text-white font-medium shadow-md"
                >
                  Search
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                {filteredPosts.slice(0, displayedPosts).map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group block h-full"
                    >
                      <article className="h-full flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        {post.mainImage?.asset ? (
                          <div className="relative h-56 w-full overflow-hidden">
                            <Image
                              src={urlFor(post.mainImage) || "/placeholder.svg"}
                              alt={post.mainImage.alt || post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              priority={index < 3}
                            />
                            {post.categories?.[0] && (
                              <div className="absolute bottom-3 left-3">
                                <Badge className="text-xs bg-blue-600 text-white px-3 py-1 shadow-md rounded-full">
                                  {post.categories[0].title}
                                </Badge>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative h-56 w-full bg-blue-50 flex items-center justify-center">
                            <span className="text-blue-300">No image</span>
                          </div>
                        )}
                        <div className="flex-1 p-6 flex flex-col">
                          <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                            {post.body.substring(0, 120)}...
                          </p>
                          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-blue-100">
                            <span className="text-sm text-gray-500">
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric"
                                }
                              )}
                            </span>
                            <span className="text-blue-200 mx-2">•</span>
                            <span className="text-sm text-gray-500">
                              By {post.author?.name}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
              {filteredPosts.length > displayedPosts && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    className="px-8 py-3 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-full font-medium shadow-md transition-all"
                  >
                    Load More Adventures
                  </Button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                {getFeaturedPosts().map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group flex gap-4 items-start hover:bg-blue-50 p-3 rounded-lg transition-colors -mx-3"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={
                            post.mainImage?.asset
                              ? urlFor(post.mainImage)
                              : "/placeholder.svg?height=64&width=64"
                          }
                          alt={post.mainImage?.alt || post.title}
                          fill
                          sizes="64px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            }
                          )}
                        </p>
                        <h3 className="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">
                  Explore by Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(
                      blogPosts.flatMap((post) =>
                        post.categories.map((cat) => cat.title)
                      )
                    )
                  ).map((category, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer transition-colors py-1.5 px-3 rounded-full"
                      onClick={() => setSearchQuery(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArchive;
