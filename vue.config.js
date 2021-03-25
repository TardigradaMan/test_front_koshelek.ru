module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@/assets/styles/scss/_colors.scss";
        @import "@/assets/styles/scss/_media_mixins.scss";
      `,
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === 'production' ? '/test_front_koshelek.ru/' : '/',
}
