/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/prefer-date-now */
const path = require('path');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');

class SWFilePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('SWFilePlugin', (compilation, callback) => {
      console.log('getAssetPath', compilation.getAssetPath());
      // const publicPath = compilation.mainTemplate.getPublicPath({
      //   hash: compilation.hash,
      // });
      // const assets = Object.keys(compilation.assets).map((asset) => `${publicPath}${asset}`);
      // const fsEditor = editor.create(memFs.create());
      // const timestamp = new Date().getTime();
      // console.log('catch assets', assets);

      // fsEditor.copyTpl(
      //   path.join(__dirname, './sw.js'),
      //   path.join(__dirname, `../../${process.env.NODE_ENV === 'development' ? 'public' : 'build'}/sw.js`),
      //   {
      //     precacheList: JSON.stringify(assets),
      //     version: timestamp,
      //   },
      // );
      // fsEditor.commit(() => {
      callback();
      // });
    });
  }
}

module.exports = SWFilePlugin;
