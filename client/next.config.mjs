/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'images.unsplash.com',
        //     port: '',
        //     pathname: '/photo-1434056886845-dac89ffe9b56/?**',
        //   },
        // ],
        domains: ['images.unsplash.com'],
      },
};

export default nextConfig;
