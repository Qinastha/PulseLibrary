import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {terser} from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import postcss from "postcss";


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
            typescript({tsconfig: './tsconfig.json'}),
            postcss({
                use: ['sass'],
                extract: true,
                minimize: true,
            }),
            terser(),
        ],
        external: ["react", "react-dom"],
    },
];