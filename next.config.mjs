/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       punycode: false,
  //     };
  //   }
  //   return config;
  // },
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
