import * as path from 'path';

export default {
  entry: path.join(__dirname, 'sw', 'worker-basic.ts'),
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'worker-basic.min.js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      options: {
        configFileName: path.join(__dirname, 'tsconfig.json')
      }
    }]
  }
};
