export default {
    input: './tsc/src/index.js',
    output: [
        {
            format: 'iife',
            file: process.env.build === 'production' ? './public/js/index.min.js' : './public/js/index.js',
            sourcemap: process.env.build === 'production'

        },
    ],
}
