import Loading from "./loading";

const loading = {};
// 必须得是 .install 至于原因需要各位去自行百度
loading.install = (Vue) => {
  // 创建一个Vue的 '子类' 组件
  const LoadingConstructor = Vue.extend(Loading);
  const instance = new LoadingConstructor();
  // 将这个实例挂载到动态创建的元素上，并且将元素添加到全局结构中去
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);
  // 在vue的原型链上添加方法，控制loading的显示与隐藏
  Vue.prototype.$showLoading = () => {
    instance.ShowloadingFun(); // 在 .Vue 文件中的 methods
  };
  Vue.prototype.$hideLoading = () => {
    instance.HideloadingFun(); // 在 .Vue 文件中的 methods
  };
};

export default loading;
