var path = require('path')
var config = {
   entry: './src/main.js',

   output: {
      path: path.resolve(__dirname, 'src'),
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react','env']
            }
         },
         {
           test: /\.css$/,
           loader: 'style-loader!css-loader'
         }
      ]
   }
}

module.exports = config;
