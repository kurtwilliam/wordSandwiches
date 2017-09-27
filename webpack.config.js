// This library allows us to combine paths easily
const path = require('path');
module.exports = {
   entry: path.resolve(__dirname, 'src/scripts', 'app.js'),
   output: {
      path: path.resolve(__dirname, 'public/scripts'),
      filename: 'bundle.js'
   },
   module: {
      rules: [
         {
             test: /\.jsx/,
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
   devServer: {
	   contentBase: './src/scripts',
	   publicPath: '/public/scripts'
	}
};