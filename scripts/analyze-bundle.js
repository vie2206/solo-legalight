// Bundle analysis script for SOLO by Legalight
// Run with: npm run analyze

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = function override(config, env) {
  // Only add analyzer in production mode when ANALYZE=true
  if (env === 'production' && process.env.ANALYZE === 'true') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.resolve(__dirname, '../build/bundle-report.html'),
        statsFilename: path.resolve(__dirname, '../build/bundle-stats.json'),
        generateStatsFile: true,
        logLevel: 'info'
      })
    );
  }

  // Optimize chunks for better caching
  if (env === 'production') {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true
          },
          dashboard: {
            test: /[\\/]src[\\/]components[\\/].*Dashboard/,
            name: 'dashboard',
            chunks: 'all',
            priority: 8
          },
          ui: {
            test: /[\\/]src[\\/]components[\\/](ui|shared)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 7
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    };

    // Minimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      'lodash': 'lodash-es', // Use ES modules version
    };
  }

  return config;
};

// Performance budget configuration
const performanceBudget = {
  maxAssetSize: 512000, // 512kb
  maxEntrypointSize: 512000, // 512kb
  hints: 'warning'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.performance = performanceBudget;
}