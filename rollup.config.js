const sveltePreConfig = require('./svelte.config')
import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'app/svelte.ts',

  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },

  plugins: [
    svelte({
      ...sveltePreConfig,
      dev: !production,
      css: css => {
        css.write('public/build/bundle.css')
      }
    }),

    typescript(),

    alias({
      entries: [
        { find: /^@pkg\/(.*)/, replacement: 'packages/$1'}
      ],
    }),

    resolve({
      browser: true,
      dedupe: ['svelte']
    }),

    commonjs(),

    postcss(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],

  watch: {
    clearScreen: false
  }
}

function serve() {
  let started = false

  return {
    writeBundle() {
      if (!started) {
        started = true

        require('child_process').spawn(
          'npm',
          ['run', 'svelte-start', '--', '--dev'],
          {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true
          }
        )
      }
    }
  }
}
