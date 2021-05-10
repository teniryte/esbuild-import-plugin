# esbuild-import-plugin

esbuild styla plugin

```js
const importPlugin = require('esbuild-import-plugin');

esbuild
  .build({
    entryPoints: ['./src/index.js'],
    bundle: true,
    outfile: './dist/app/app.js',
    loader: {
      '.js': 'jsx',
    },
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    plugins: [
      importPlugin,
    ],
  });
```
