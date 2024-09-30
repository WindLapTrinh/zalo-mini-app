import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: './src',
    base: '',
    plugins: [reactRefresh()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // Thêm cấu hình alias
      },
    },
  });
};
