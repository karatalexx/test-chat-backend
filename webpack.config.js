const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const base = {
  mode: 'none',
  entry: [path.join(__dirname, './src/main.ts')],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [new CleanWebpackPlugin()]
};

const envs = {
  // Development config
  development: merge(base, {
    mode: 'development',
    entry: ['webpack/hot/poll?100'],
    output: {
      hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
      hotUpdateMainFilename: '.hot/[hash].hot-update.json'
    },
    externals: [
      require('webpack-node-externals')({
        whitelist: ['webpack/hot/poll?100']
      })
    ],
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }),

  //  Production config
  production: merge(base, {
    mode: 'production',
    externals: { knex: 'knex', express: 'express', argon2: 'argon2' },
    optimization: {
      minimize: true,
      minimizer: [new (require('terser-webpack-plugin'))()]
    },
    plugins: [new webpack.NamedModulesPlugin()]
  })
};

module.exports = (env, argv) => envs[argv.mode || 'development'];
