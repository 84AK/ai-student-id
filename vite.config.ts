import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vercel 환경이거나 로컬 개발 환경일 경우 '/', 그 외(예: GitHub Pages)에는 '/ai-student-id/' 설정
  base: process.env.VERCEL || process.env.NODE_ENV === 'development' ? '/' : '/ai-student-id/',
})
