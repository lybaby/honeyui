var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var utilsListMenu = fs.readdirSync(path.resolve(__dirname, '../src/utils/menu'));
var utilsListPopup = fs.readdirSync(path.resolve(__dirname, '../src/utils/popup'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var directivesList = fs.readdirSync(path.resolve(__dirname, '../src/directives'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `@tencent/honey-ui/lib/${key}`;
});

externals['element-ui/src/locale'] = '@tencent/honey-ui/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/utils/${file}`] = `@tencent/honey-ui/lib/utils/${file}`;
});
utilsListMenu.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/utils/menu/${file}`] = `@tencent/honey-ui/lib/utils/menu/${file}`;
});
utilsListPopup.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/utils/popup/${file}`] = `@tencent/honey-ui/lib/utils/popup/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/mixins/${file}`] = `@tencent/honey-ui/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/transitions/${file}`] = `@tencent/honey-ui/lib/transitions/${file}`;
});

directivesList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/directives/${file}`] = `@tencent/honey-ui/lib/directives/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'element-ui': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
