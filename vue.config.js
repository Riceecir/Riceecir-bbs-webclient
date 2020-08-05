module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
