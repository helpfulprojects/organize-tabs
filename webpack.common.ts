import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
const config: webpack.Configuration = {
  entry: {
    background: "./src/service-worker.ts",
    popup: "./src/popup.ts",
  },
  resolve: {
      extensions: [".ts"],
  },
  module: {
      rules: [
          {
              test: /\.ts$/,
              loader: "ts-loader",
              exclude: /node_modules/,
          },
      ],
  },
  output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Clean the output directory before emit.
  },
  plugins: [
      new CopyWebpackPlugin({
          patterns: [{from: 'static'}],
      }),
  ]
}

export default config