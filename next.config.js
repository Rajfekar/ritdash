/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === "production" ? "/ritdash" : "",
  publicRuntimeConfig: {
    contextPath: process.env.NODE_ENV === "production" ? "/ritdash" : "",
  },
}
module.exports = nextConfig
