/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === "production" ? "/tsdash" : "",
  publicRuntimeConfig: {
    contextPath: process.env.NODE_ENV === "production" ? "/tsdash" : "",
  },
}
module.exports = nextConfig
