import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: './', // Correct root for Vite
    build: {
        outDir: 'dist',
        emptyOutDir: true, // Ensures old build files are cleared
        rollupOptions: {
            input: '/index.html', // Explicit entry point for Vercel
        }
    },
    plugins: [react()],
    server: {
        port: 3000, // Optional: Ensures consistent local development
        host: true  // Required for Vercel's preview deployment
    },
    resolve: {
        alias: {
            '@': '/src', // Optional: Cleaner import paths for your project structure
        }
    }
});
