/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    headers: [
        {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
        },
    ],
};

export default nextConfig;
