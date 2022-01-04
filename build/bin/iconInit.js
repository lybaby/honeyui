'use strict';

var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
// var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/_tea.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;
var classList = [];

nodes.forEach((node) => {
  var selector = node.selector || '';
  // var reg = new RegExp(/\.el-icon-([^:]+):before/);
  var reg = new RegExp(/^\.tea-icon-([^{]+)/);
  var arr = selector.match(reg);
  let flag = true;

  // if (node.nodes) {
  //   const labelArr = node.nodes.map((child) => child.prop);
  //   flag = labelArr.indexOf('background-size') > -1;
  // }

  if (arr && arr[1] && flag && arr[1].indexOf(':hover') === -1) {
    classList.push(arr[1].replace('.size-', ' size-'));
  }
});

classList.reverse(); // 希望按 css 文件顺序倒序排列

fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
