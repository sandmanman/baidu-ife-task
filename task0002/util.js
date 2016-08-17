/**
 * JavaScript数据类型及语言基础
 * @author sandman.csser@foxmail.com
 * @date 2016.06.23
 */

// 获取指定id的元素
function $(id) {
    return document.getElementById(id);
}

// 判断arr是否为一个数组，返回一个bool值
// Array.isArray() IE8不支持该方法
// ECMAScript5判断数据可使用Array.isArray()
function isArray(arr) {
    //return Array.isArray(arr);
    return Object.prototype.toString.call(arr) === '[object Array]';
}
var arr = [];
console.log('isArray:' + isArray(arr));


// 判断fn是否为一个函数，返回bool值
function isFn(fn) {
    return typeof fn === 'function';
}
console.log('fn:' + isFn(function() {}));


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var reslut;
    if ( typeof(src) === 'object' ) {
        // 对象为日期对象时也直接赋值
        if ( Object.prototype.toString.call(src) === '[object Date]' ) {
            reslut = src;
        } else {
          // 判断对象的类型是array还是object
          reslut = ( Object.prototype.toString.call(src) === '[object Array]' ) ? [] : {};
          for (var i in src){
              if (src.hasOwnProperty(i)) { // 排除继承属性
                  if ( typeof src[i] === 'object' ) {
                      reslut[i] = cloneObject(src[i]); // 递归赋值
                  } else {
                      reslut[i] = src[i]; //直接赋值
                  }
              }
          }
        }
    } else {
      // 原始类型直接赋值
      reslut = src;
    }
    return reslut;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a); // 1
console.log(tarObj.b.b1[0]); // "hello"


// 对数组进行去重操作，并返回去重后的数据
function uniqArray(arr) {
    var reslut = [];
    for (var i = 0, arrLength = arr.length; i < arrLength; i++) {
        if ( reslut.indexOf(arr[i]) === -1 ) { // 查找是否已经包含该元素
            reslut.push(arr[i]); // 添加到新的数组
        }
    }
    return reslut;
}
// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log('去重后:'+b); // [1, 3, 5, 7]



// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var result = '';
    // 从字符串首循环查找
    for (var i = 0, str_l = str.length; i < str_l; i++) {
        if ( str[i] != ' ' && str[i] != '\t' ) {
            break;
        }
    }
    // 从字符串尾循环查找
    for (var j = str.length -1; j >=0; j--) {
        if ( str[i] != ' ' && str[i] != '\t' ) {
            break;
        }
    }
    reslut = str.slice(i, j+1);
    // slice(beginSlice[, endSlice])方法提取字符串中的一部分，并返回这个新的字符串
    // beginSlice从0开始，endSlice如果为负则从尾及-1开始

    return reslut;
}
// 正则实现trim函数
function trim(str) {
  var result = '';
  result = str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''); // 匹配首尾
  // ***chrome下'\s' 可以匹配全角空格，但是考虑兼容的话，需要加上’\uFEFF\xA0’，去掉BOM头和全角空格
  //result = str.replace(/[\s\uFEFF\xA0]/g, ''); // 匹配字符串中的所有空格
  // replace() 方法使用一个替换值（replacement）替换掉一个匹配模式（pattern）在原字符串中某些或所有的匹配项，并返回替换后的字符串
  return result;
}
// 使用示例
var str = '   hi!   　全角    ';
str = trim(str);
console.log(str); // 'hi!'


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    for (var i = 0, arr_length = arr.length; i < arr_length; i++) {
      fn( arr[i], i ); // arr[i]为item，i为index
    }
}
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index + ': ' + item)
// }
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html


// 获取对象里第一层元素数量，并返回整数
// hasOwnProperty()判断一个属性是定义在对象本身而不是继承自原型链，我们需要使用从 Object.prototype 继承而来的 hasOwnProperty 方法。
// hasOwnProperty()方法是 Javascript 中唯一一个处理对象属性而不会往上遍历原型链的。
// 当判断对象属性存在时，hasOwnProperty 是唯一可以依赖的方法。
// 这里还要提醒下，当我们使用 for in loop 来遍历对象时，使用 hasOwnProperty 将会很好地避免来自原型对象扩展所带来的困扰。
function getObjectLength(obj) {
    var count = 0;
    for (var i in obj) {
      if ( obj.hasOwnProperty(i) ) {
          count ++;
      }
    }
    return count;
}
// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3



// 正则表达式
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return reg.test(emailStr);
}
// 使用示例
var email = 'sandman.csser@foxmail.com';
console.log( 'eMail:'+isEmail(email) );

// 判断是否为手机号
function isMobilePhone(phone) {
    // 简单判断是11位数字
    // 严谨点要判断手机号码段如139,138....
    var reg = /^(0|86)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(phone);
}
// 使用示例
var phone = '15801844563';
console.log( 'phone number:'+isMobilePhone(phone) );



// DOM
// 添加class,移除class,是否同级元素，获取元素位置

// 先判断是否包含该class
function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0, cl = classNames.length; i < cl; i++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}

// 添加class
function addClass(element, className) {
    if ( !hasClass(element, className) ) {
        element.className = element.className ? [element.className, className].join(' '): className;
    }
}

// 移除class
function removeClass(element, className) {
    if ( className && hasClass(element, className) ) {
        var classNames = element.className.split(/\s+/);
        for (var i = 0, cl = classNames.length; i < cl; i++) {
            if (classNames[i] === className) {
                classNames.splice(i, 1); // array.splice(start, deleteCount)
                break;
            }
        }
    }
    element.className = classNames.join(' ');
}


// 是否为兄弟元素
function isSiblingNode(element, siblingNode) {
    for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
        if (node === siblingNode) {
            return true;
        }
    }
    return false;
}


// 获取元素相对于浏览器窗口左上角的位置
// 注意：不是文档左上角，如果是相对于文档左上角，还需要加上scrollTop、scrollLeft
function getPosition(element) {
    var elementPos = element.getBoundingClientRect();
    return elementPos;
}



// DOM事件
