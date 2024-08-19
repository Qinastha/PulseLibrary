import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';


export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "dist/index.es.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            scss({
                output: 'dist/bundle.css',
                outputStyle: 'compressed',
                includePaths: ['src/styles'],
            }),
            postcss({
                extensions: ['.css', '.scss'],
                use: ['sass'],
                extract: true,
                minimize: true,
                sourceMap: true,
            }),
            terser(),
        ],
        external: ["react", "react-dom"],
    },
];