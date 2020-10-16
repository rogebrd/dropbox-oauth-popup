import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const umd = {
  input: 'src/dropboxPopup.js',
  output: {
    file: `${__dirname}/dist/dropboxPopup.js`,
    format: 'umd',
    name: 'DropboxPopup',
    sourcemap: true,
    globals: {
      dropbox: 'Dropbox',
    },
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
  ],
  external: ['dropbox'],
};

const umdMin = {
  input: 'src/dropboxPopup.js',
  output: {
    file: `${__dirname}/dist/dropboxPopup.min.js`,
    format: 'umd',
    name: 'DropboxPopup',
    sourcemap: false,
    globals: {
      dropbox: 'Dropbox',
    },
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
  external: ['dropbox'],
};

export default [umd, umdMin];
