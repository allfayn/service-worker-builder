import * as path from 'path';
import {AngularServiceWorkerPlugin} from '@angular/service-worker/build/webpack';
const CopyWebpackPlugin = require('copy-webpack-plugin')

export default {
  entry: path.join(__dirname, 'register-basic.js'),
  output: {
    path: 'dist/',
    filename: 'register-basic.min.js',
  },
  plugins: [
    // This pulls an existing ngsw-manifest.json into the build.
    // The static configuration will be merged in.
    new CopyWebpackPlugin([
      {from: 'ngsw-manifest.json'},
      {from: 'src/assets', to: 'assets' },
      {from: 'src/manifest.json' },
      {from: 'src/index.html' },
      {from: 'src/favicon.ico' }
    ]),
    new AngularServiceWorkerPlugin(),
  ],
}