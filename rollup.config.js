import babel from 'rollup-plugin-babel';

const config = {
    output: {
        format: 'umd',
        sourcemap: true,
        globals: {
            'dropbox': 'Dropbox'
        }
    },
    plugins: [
        babel(),
    ],
    external: ['dropbox']
};

export default config;