/**
 * JavaScript数据类型及语言基础
 * @auther sandman.csser@foxmail.com
 * @date 2016.06.23
 */

// 判断arr是否为一个数组，返回一个bool值
// Array.isArray() IE8不支持该方法
// ECMAScript5判断数据可使用Array.isArray()
function isArray(arr) {
   //return Array.isArray(arr);
   return Object.prototype.toString.call(arr) === '[object Array]';
}
var arr = [];
console.log( 'isArray:' + isArray(arr) );


// 判断fn是否为一个函数，返回bool值
function isFn(fn) {
  return typeof(fn) === 'function';
}
console.log('fn:' + isFn( function(){} ));
