import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/bin/cli.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
});
