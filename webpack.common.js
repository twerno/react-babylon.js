const webpack = require('webpack')
const path = require('path')
const package = require('./package.json')

module.exports = {
  entry: [
    './src/main/js/index.tsx'
  ],
  output: {
    filename: 'app.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/js/',
    path: path.resolve(__dirname, './static/js/')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['src/main/js', 'node_modules'],
  },
  module: {
    rules:
      [
        {
          test: /\.css$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'bundle.css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./node_modules'],
                implementation: require('dart-sass'),
                fiber: require('fibers'),
              }
            },
          ]
        },
        {
          test: /\.ts(x?)$/, loaders: ['babel-loader', 'awesome-typescript-loader'],
          include: [
            path.resolve('src/main/js'),
          ]
        }
      ],

  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.babylonjs": JSON.stringify((package.dependencies.babylonjs || '').replace('^', '')),
      "process.env.babylonjsGui": JSON.stringify((package.dependencies["babylonjs-gui"] || '').replace('^', '')),
      "process.env.babylonjsLoaders": JSON.stringify((package.dependencies["babylonjs-loaders"] || '').replace('^', '')),
    })
  ],
  // externals: {
  //   'BABYLON': {
  //     commonjs: 'BABYLON',
  //     commonjs2: 'BABYLON',
  //     amd: 'BABYLON',
  //     root: 'BABYLON',
  //   },
  //   // babylonjs: 'babylonjs',
  //   babylonjsgui: 'babylonjs-gui',
  //   babylonjsloaders: 'babylonjs-loaders'
  // }

}
