const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['15.165.182.103'],
  },
  reactStrictMode: false,
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
