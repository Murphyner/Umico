import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'copy-resolved',
          async resolveId(id) {
            if (id.startsWith('/img')) {
              return id
            }
            return null
          },
          async load(id) {
            if (id.startsWith('/img')) {
              const file = resolve(__dirname, id.slice(1))
              const content = await fs.promises.readFile(file)
              return `export default ${JSON.stringify(content.toString())}`
            }
            return null
          }
        }
      ],
      input: {
        index: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login/index.html'),
        category: resolve(__dirname, 'category/index.html'),
        product: resolve(__dirname, 'product/index.html'),
        sebet: resolve(__dirname, 'sebet/index.html'),
        main: resolve(__dirname, 'src/main.js'),
        actualCategory: resolve(__dirname, 'src/actual-category.js'),
        actualTags: resolve(__dirname, 'src/actual-tags.js'),
        allPage: resolve(__dirname, 'src/AllPage.js'),
        endirimSlide: resolve(__dirname, 'src/endirim-slide.js'),
        megaEndirim: resolve(__dirname, 'src/mega-endirim.js'),
        moreSale: resolve(__dirname, 'src/more-sale.js'),
      },
      output: {
        entryFileNames: '[name]/assets/[name]-[hash].js',
        chunkFileNames: '[name]/assets/[name]-[hash].js',
        assetFileNames: '[name]/assets/[name]-[hash][extname]'
      }
    },
    outDir: 'dist' 
  },
  css: {
    include: [
      './src/style.css',
      './src/input.css'
    ]
  }
})
