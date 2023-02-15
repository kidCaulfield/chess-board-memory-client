const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "chess-board-memory",
  mode: "production",
  optimization: {
    runtimeChunk: "single",
  },
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    shared: "lodash",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    client: {
      logging: "info",
    },
    port: 8001,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ["", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ico|png)$/,
        type: "asset/resource",
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
