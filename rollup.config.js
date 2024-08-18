import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import {terser} from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcsss from "postcss-import"
import postcssenv from "postcss-preset-env"
import {dts} from "rollup-plugin-dts";


export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.cjs.js",
                format: "cjs",
                sourcemap: "inline",
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: "inline",
            },
        ],
        plugins: [
            peerDepsExternal(),
            json(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
                babelHelpers: 'bundled',
            }),
            resolve(),
            commonjs(),
            postcss({
                extract: true,
                plugins: [
                    postcsss(),
                    postcssenv({
                        stage: 0,
                    }),
                ],
                extensions: ['.css', '.scss'],
                use: ['sass'],
            }),
            typescript({
                tsconfig: "./tsconfig.json",
                sourceMap: true,
                inlineSources: true,
            }),
            terser(),
        ],
        external: ["react", "react-dom"],
    },
];