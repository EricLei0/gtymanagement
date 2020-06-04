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
        target: "http://127.0.0.1:8084",
        //target: this.publicPath + "/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },

  /* 
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8084",
        //target: this.publicPath + "/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }, */

  runtimeCompiler: true
};
