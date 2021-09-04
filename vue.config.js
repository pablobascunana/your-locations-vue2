module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  transpileDependencies: ['/node_modules/']
}
