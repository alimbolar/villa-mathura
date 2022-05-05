const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    filename: "main.[hash:4].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    assetModuleFilename: "./assets/images/[name][ext][query]",
  },
  devServer: {
    static: { directory: path.resolve(__dirname, "build") },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/template.html" }),
    new MiniCssExtractPlugin({ filename: "[name].[hash:4].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(jpg|jpeg|svg|gif|png)$/,
        type: "asset/resource",
      },
    ],
  },
};
