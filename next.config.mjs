/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'avatar.vercel.sh',
        },
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',  
        }
      ],
    },
  };
  
  export default nextConfig;
  