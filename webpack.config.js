const path = require("path");

const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./src/scss/main.scss"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    })
  ]
};
