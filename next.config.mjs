/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   // swcMinify: true, ← Remove this line (deprecated in Next.js 15)
   images: {
      domains: ["localhost"],
      formats: ["image/webp", "image/avif"],
   },
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "X-Frame-Options",
                  value: "DENY",
               },
               {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
               },
               {
                  key: "Referrer-Policy",
                  value: "origin-when-cross-origin",
               },
            ],
         },
      ];
   },
};

export default nextConfig;
