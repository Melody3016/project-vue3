import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less" // 一定要开启这个配置项
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 在这里自定义主题色等样式
          "primary-color": "#1da57a",
          "link-color": "#1da57a",
          "border-radius-base": "2px"
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})