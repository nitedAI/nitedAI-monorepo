/// <reference types='vitest' />
import path from 'path';
import react from '@vitejs/plugin-react';
import { loadEnv, defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import tsConfig from '../../../tsconfig.base.json';

interface PathMap {
  [key: string]: string;
}

function getPaths(): PathMap {
  const { paths } = tsConfig.compilerOptions;
  const result: PathMap = {};
  Object.keys(paths).forEach((key) => {
    const value = paths[key][0];
    const keyWithoutStar = key.replace('/*', '');
    result[keyWithoutStar] = path.join(process.cwd(), value.replace('/*', ''));
  });
  result['~'] = path.join(process.cwd(), 'node_modules');
  result.src = path.join(process.cwd(), 'src/apps/chat/src');
  return result;
}


export default ({ mode }: { mode: string }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};


  return defineConfig({
    cacheDir: '../../../node_modules/.vite/chat',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [react(), nxViteTsPaths()],

    resolve: {
      alias: getPaths(),
    },

    test: {
      globals: true,
      cache: {
        dir: '../../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  });
}
