/*
 * @Description: 
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-14 10:47:19
 * @LastEditTime: 2024-06-17 09:15:49
 * @FilePath: \striker-1945\vite.config.ts
 */
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5000,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist'
  }
})