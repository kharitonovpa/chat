import socketModule from './server'
export default defineNuxtConfig({
  // ваша конфигурация

  build: {
    extend(config, { isDev, isClient }) {
      // Проверяем, определено ли свойство modules и что оно является массивом
      if (this.options.modules && Array.isArray(this.options.modules)) {
        config.module.rules.push({
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] },
        });
      }
    },
  },
  modules: [
    socketModule
  ]
});