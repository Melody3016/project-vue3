// 设置网页标题
const title = (title: string) => {
  title = title || "XBoot一站式前后端分离快速开发平台"
  window.document.title = title
}

// await错误处理封装
const awaitWrap = <T, U = any>(
  promise: Promise<T>
): Promise<[U | null, T | null]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, null]>((err) => [err, null])
}

export default {
  title,
  awaitWrap
}
