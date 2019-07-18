const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const webpackConfig = mode => {
  const isDev = mode === 'development'
  const isProd = mode === 'production'

  const outputPath = path.resolve(__dirname, 'build')
  // const publicPath = isDev ? '/' : '/'

  let plugins = [
    new HtmlWebpackPlugin({
      title: 'Nicolas Tudela',
      template: './public/index.html',
      favicon: './public/favicon.png',
    }),
    new Dotenv({
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    }),
  ]

  if (isProd) {
    plugins = plugins.concat([
      new CleanWebpackPlugin(),
      new webpack.HashedModuleIdsPlugin(),
    ])
  }

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return {
    entry: './src/index.js',
    output: {
      path: `${outputPath}`,
      // publicPath: `${publicPath}`,
      globalObject: 'this',
      filename: isDev ? '[name].js' : 'static/js/[name].[contentHash].js',
      // Files created by loaders aren't affected.
      // In this case you would have to try the specific loader's available options.
      //  '[name].bundle.js' ->  entry name:
      // '[id].bundle.js' -> internal chunk id
      // '[name].[hash].bundle.js' ->  unique hash generated for every build
      // '[chunkhash].bundle.js' -> using hashes based on each chunks' content
      // '[contenthash].bundle.css' -> Using hashes generated for extracted content
      // substitution which is the hash of the content of a file, which is different for each asset.
      // --
      // chunkFilename: This option determines the name of non-entry chunk files
      // Note that these filenames need to be
      // generated at runtime to send the requests for chunk.
    },
    resolve: {
      alias: {
        src: path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        pages: path.join(__dirname, 'src/pages'),
        images: path.join(__dirname, 'src/images'),
        icons: path.join(__dirname, 'src/icons'),
        'react-dom': '@hot-loader/react-dom',
      },
      extensions: ['*', '.js', '.jsx'],
    },
    devtool: isDev ? 'inline-source-map' : 'source-map',
    optimization: {
      // namedModules: true,
      // [for-debug] Tells webpack to use readable module identifiers for better debugging
      runtimeChunk: 'single',
      // split out runtime code into a separate chunk(s)
      splitChunks: {
        chunks: 'initial',
        // "initial" -> optimizes modules/splitting imported statically,
        // and produces new chuncks that must loaded specifically which increase loading time
        // "all" -> Tries to optimize statics as dynamics modules imports
        // "async" -> optimizes modules imported dynamically, default confiugurations are
        // optimized to work better with this option. No need to load chuncls/bundles separately
        // it does load it only when is required.
        // cacheGroups: {
        //   vendors: {
        //     name: 'vendor',
        //   },
        //   styles: {
        //     name: 'styles',
        //     test: /\.css$/,
        //     chunks: 'all',
        //     enforce: true,
        //   },
        // },
      },
      noEmitOnErrors: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg|pdf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, '/build'),
      historyApiFallback: {
        index: 'index.html',
      },
      port: 3000,
      // publicPath: `${publicPath}`,
      hot: true,
      historyApiFallback: true,
    },
    plugins,
  }
}

module.exports = (env, argv) => webpackConfig(argv.mode)
