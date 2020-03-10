const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const nextRuntimeDotenv = require("next-runtime-dotenv");

const withConfig = nextRuntimeDotenv({ public: ["API_URL", "API_KEY"] });

const cssConfig =  withCSS({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
})

const nextConfig = {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
        },
        browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
        },
    },
    publicRuntimeConfig: {
        PROXY_MODE: process.env.PROXY_MODE,
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        STATIC_PATH: process.env.STATIC_PATH,
    },
};

module.exports = withConfig(
    withPlugins([[cssConfig], [withSass], [withBundleAnalyzer]], nextConfig)
);
