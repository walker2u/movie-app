/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // https://picsum.photos/200/300
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
            },
            {
                // https://cdn.myanimelist.net/images/anime/1015/138006.webp
                protocol: 'https',
                hostname: 'cdn.myanimelist.net',
                port: '',
            }
        ]
    }
};

export default nextConfig;
