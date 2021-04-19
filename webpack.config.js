const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

// const mode = isProd ? "production" : "development";
const mode = "development";
const target = isProd ? "browserslist" : "web";

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: ["./index.js"],
    // analytics: './analytics.ts'
  },
  mode,
  target,

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [require("autoprefixer")];
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: "Регистратор СУО QuickQ",
      footer: "www.quickq.ru",
      template: "./index.htm",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/favicon.ico"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin(),
  ],

  resolve: {
    extensions: [".js", ".json", ".png"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};
