import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Startup task to copy user's uploaded logo to public directory
try {
  const src = "C:/Users/USER/.gemini/antigravity-ide/brain/533ed7b1-3496-458c-b60f-6c6053060e34/media__1785784361032.png";
  const destDir = path.join(process.cwd(), "public");
  const dest = path.join(destDir, "logo.png");
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("SUCCESS: Logo copied to", dest);
  }
} catch (err) {
  console.error("FAIL: Error copying logo:", err);
}

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
