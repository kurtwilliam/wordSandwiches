const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'script.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015'] }
        }
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  watch:true,
  watchOptions: {
    ignored: [/node_modules/, /.git/] 
  },
  devServer: {
    contentBase: './src/scripts',
    publicPath: '/public/scripts'
  }
};

