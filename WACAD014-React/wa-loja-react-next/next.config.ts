import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ranekapi.origamid.dev",
      },
      {
        protocol: "https",
        hostname: "favoritos-json-server-ruby.vercel.app"
      }
    ]
  }
};

export default nextConfig;
