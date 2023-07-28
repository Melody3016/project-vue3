import { createApp } from "vue"
import { createPinia } from "pinia"
import VueApexCharts from "vue3-apexcharts"
// 全局引入图片验证码组件
import SlideVerify from "vue-monoplasty-slide-verify/src/lib/index.js"
import i18n from "@/locale"
import App from "./App.vue"
import router from "./router"
import commonFunc from "./utils/commonFunc"
// 解决无法自动导入的样式
import "ant-design-vue/dist/antd.css"
import "nprogress/nprogress.css"

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(commonFunc)
  .use(SlideVerify)
  .use(VueApexCharts)
  .mount("#app")
