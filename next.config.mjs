/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1", "localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**localhost**",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
