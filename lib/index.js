'use strict';

const fs = require('fs');
const path = require('path');
const ooiImport = require('ooi/import');

module.exports = {
  name: 'import',
  setup(options) {
    options.onResolve({ filter: /\.ooi/ }, args => {
      let alias =
          args.path.split(':').length === 1
            ? args.path
            : args.path
                .split(':')
                .map(name => name.trim())
                .filter(name => !!name)[0],
        filename = path.resolve(
          args.resolveDir,
          args.path.split(':').length === 1
            ? args.path
            : args.path
                .split(':')
                .map(name => name.trim())
                .filter(name => !!name)[1]
        );
      options.dir = args.resolveDir;
      options.importer = args.importer;
      return {
        path: filename,
        namespace: 'import-ns',
      };
    });

    options.onLoad({ filter: /.*/, namespace: 'import-ns' }, async args => {
      let filename = args.path,
        source = fs.readFileSync(filename, 'utf-8'),
        names = source
          .split('\n')
          .map(line => line.trim())
          .filter(line => !!line),
        library = await ooiImport(names, options.dir, options.importer);
      return {
        contents: library,
        loader: 'js',
      };
    });
  },
};
