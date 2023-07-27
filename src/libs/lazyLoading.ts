const modules = import.meta.glob(["../views/*/*.vue", "../views/*/*/*.vue"])
export default (url: string) => modules[`../views/${url}.vue`]
