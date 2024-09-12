const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "./", // 文件加载设置为相对路径
  // devServer: {
  //   https:true
  //   host: "localhost",
  //   port: 9020, // 指定端口
  //   open: true, //设置true为打开默认浏览器
  //   hot: true, //热更新
  //   proxy: {
  //     "/api": {
  //       target: "", //要跨域的域名
  //       ws: true, // 是否启用websockets
  //       changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
  //       pathRewrite: {
  //         //重写匹配的字段，如果不需要在请求路径上，重写为""
  //         "^/api": "/api",
  //       },
  //     },
  //   },
  // },
});
