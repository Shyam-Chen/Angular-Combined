const path = require('path');
const webpack = require('webpack');
const typescript = require('typescript');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rules = [
  {
    test: /\.html$/,
    use: ['html-loader'],
    exclude: [path.join(__dirname, 'src/app/**/*.html')]
  }, {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }
    ],
    exclude: [path.join(__dirname, 'src/app/**/*.css')]
  }, {
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [path.join(__dirname, 'src/index.html')]
  }, {
    test: /\.css$/,
    use: [
      'to-string-loader',
      'css-loader',
      'postcss-loader'
    ],
    exclude: [path.join(__dirname, 'src/style.css')]
  }, {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: ['file-loader']
  }
];

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => module.context && /node_modules/.test(module.context)
  })
];

if (process.env.NODE_ENV === 'production') {
  rules.push({
    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
    use: '@ngtools/webpack'
  });

  plugins.push(
    new AngularCompilerPlugin({
      tsConfigPath: 'tsconfig.json',
      entryModule: 'src/app/app.module#AppModule'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        unused: true,
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true,
        sequences: true,
        booleans: true,
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  );
} else {
  rules.push({
    test: /\.ts$/,
    use: [
      'awesome-typescript-loader',
      'angular-router-loader',
      'angular2-template-loader'
    ]
  });

  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, 'notfound')
    )
  );
}

module.exports = {
  cache: true,
  context: __dirname,
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    stats: {
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      errors: true,
      errorDetails: false,
      hash: false,
      timings: false,
      modules: false,
      warnings: false
    },
    port: 8000
  },
  devtool: 'sourcemap',
  entry: {
    app: './src/client.ts'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js'
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins
};
