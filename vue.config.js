module.exports = {
  //publicPath: process.env.NODE_ENV === 'production' ? '/TableApp/' : '/',

  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/sass/main.sass";`
      }
    }
  }
}
