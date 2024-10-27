/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yilevmhouhpmmcysxoam.supabase.co",
      },
    ],
  },
};

export default nextConfig;
