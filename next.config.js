const path = require("path");
const fs = require("fs");
/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  webpack: (config, context) => {
    config.resolve.modules.push(path.resolve(__dirname, 'src'));
    config.resolve.modules.push(path.resolve(__dirname, 'public'));
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: false,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.less$/,
      exclude: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: false,
          },
        },
        'less-loader'
      ],
    });
    config.module.rules.push({
      test: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: false,
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'less-loader'
      ],
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    });

    return config;
  },
}

module.exports = nextConfig
