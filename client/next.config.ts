import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/s/files/**'
      }
    ]
  }
}

export default nextConfig
