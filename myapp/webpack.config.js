const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode || 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, argv.mode === 'production' ? 'build' : 'dist'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', {
                runtime: 'automatic'
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/assets',
          to: 'assets',
          noErrorOnMissing: true
        },
        {
          from: 'public/_redirects',
          to: '_redirects',
          noErrorOnMissing: true
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
    open: true,
    historyApiFallback: true,
    headers: {
      'Content-Security-Policy': "default-src 'self'; connect-src 'self' https://api.freeapi.app *.msn.com ws://localhost:8080 wss://localhost:8080 http://localhost:5000 https://your-gym-backend.onrender.com https://accounts.google.com https://*.googleapis.com https://apis.google.com https://gstatic.com https://*.gstatic.com https://identitytoolkit.googleapis.com https://*.firebaseapp.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://*.googleapis.com https://apis.google.com https://gstatic.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://accounts.google.com https://*.googleapis.com; img-src 'self' data: https:; font-src 'self' https:; frame-src 'self' https://accounts.google.com https://*.googleapis.com https://*.firebaseapp.com;"
    }
  }
});
