import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/hulunote-kanban-table-plugin.js',
  format: 'iife',
  globalName: 'HulunoteKanbanTablePlugin',
  target: 'es2020',
  sourcemap: true,
  minify: false,
});

console.log('Build complete: dist/hulunote-kanban-table-plugin.js');
