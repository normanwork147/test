module.exports = {
  presets: [
    [
      '@babel/preset-env', // 将基于实际浏览器及运行环境，自动的确定babel插件及polyfill
      {
        // useBuiltIns: 'usage', // 按需使用/ @babel/plugin-transform-runtime 作用基本相同，二选一
        // corejs: 3,
        modules: false, // 意思是不转义import语法，主要是为了tree-shaking
      },
    ],
    '@babel/preset-react', // 转化js、jsx文件的插件集合
    '@babel/preset-typescript', // 转化ts，tsx文件的插件集合
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime', // 优化polyfill的插件
      {
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ],
};
