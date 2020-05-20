module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000/api",
        //target: this.publicPath + "/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  runtimeCompiler: true
};
