import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js', // Update with your entry file
  output: {
    file: 'dist/bundle.js', // Update with your desired output file
    inlineDynamicImports: true,
    format: 'cjs', // CommonJS format for Node.js compatibility
  },
  plugins: [
    // babel(),
    resolve({
        browser: false,

        // https://github.com/rollup/plugins/tree/master/packages/node-resolve/#exportconditions
        exportConditions: [ 'node', 'default', 'module', 'import' ],  // we have to include 'node' first here, or else "file-type" fails (tries to use the 'browser' export, which does not have all methods)

        preferBuiltins: true,

        resolveOnly: [
            // have to list every ESM based or await import()'ed module here
            "file-type",
            'ora',
            'strtok3',
            'peek-readable',
            'node:buffer',
            'token-types',
            'log-symbols',
            'is-unicode-supported',
            'is-interactive',
            'stdin-discarder',
        ]
    }),
    commonjs(),
    
  ],
};
