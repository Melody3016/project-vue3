import type { App } from "vue"
import format from "date-fns/format"
import {
  getRequest,
  postRequest,
  putRequest,
  postBodyRequest,
  getNoAuthRequest,
  postNoAuthRequest
} from "@/api/axios"
import { setStore, getStore, removeStore } from "@/libs/localStroage"

// 为globalProperties添加类型
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $format: typeof format
    $getRequest: typeof getRequest
    $postRequest: typeof postRequest
    $putRequest: typeof putRequest
    $postBodyRequest: typeof postBodyRequest
    $getNoAuthRequest: typeof getNoAuthRequest
    $postNoAuthRequest: typeof postNoAuthRequest
    $setStore: typeof setStore
    $getStore: typeof getStore
    $removeStore: typeof removeStore
  }
}

// 挂载全局使用的方法
export default {
  install(app: App) {
    app.config.globalProperties["$format"] = format
    app.config.globalProperties["$getRequest"] = getRequest
    app.config.globalProperties["$postRequest"] = postRequest
    app.config.globalProperties["$putRequest"] = putRequest
    app.config.globalProperties["$postBodyRequest"] = postBodyRequest
    app.config.globalProperties["$getNoAuthRequest"] = getNoAuthRequest
    app.config.globalProperties["$postNoAuthRequest"] = postNoAuthRequest
    app.config.globalProperties["$setStore"] = setStore
    app.config.globalProperties["$getStore"] = getStore
    app.config.globalProperties["$removeStore"] = removeStore
  }
}
// Vue.prototype.getRequest = getRequest;
// Vue.prototype.postRequest = postRequest;
// Vue.prototype.putRequest = putRequest;
// Vue.prototype.postBodyRequest = postBodyRequest;
// Vue.prototype.getNoAuthRequest = getNoAuthRequest;
// Vue.prototype.postNoAuthRequest = postNoAuthRequest;
// Vue.prototype.setStore = setStore;
// Vue.prototype.getStore = getStore;
// Vue.prototype.removeStore = removeStore;
// Vue.prototype.format = format;
// Vue.prototype.util = util;
// Vue.prototype.getUserInfo = util.getUserInfo;
