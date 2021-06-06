const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HTMLInlineScriptPlugin = require('html-inline-script-webpack-plugin');

/**
 * @type import("webpack").Configuration
 */
const webpackConfig = {
  entry: {
    index: "./src/index.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
      inject: "body",
      minify: false,
      scriptLoading: "blocking"
    }),
    new HTMLInlineScriptPlugin()
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      ["@/js"]: path.resolve(__dirname, "src/js"),
      ["@/css"]: path.resolve(__dirname, "src/css"),

    }
  },

};

module.exports = webpackConfig;