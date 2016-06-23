# 百度前端技术学院 前端技术学习记录

[Baidu IFE](https://github.com/baidu-ife/ife)


### 任务中提到及遇见的问题记录

#### JavaScript 的性能优化：加载和执行

[JavaScript 的性能优化：加载和执行](http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html)

- 优化 JavaScript 的首要规则：将脚本放在底部
- 尽可能的合并压缩文件，减少性能消耗
- 无阻塞的脚本：在页面加载完成后才加载 JavaScript 代码，这就意味着在 window 对象的 onload事件触发后再下载脚本
- 动态加载：

  通过检查 readyState 状态加载 JavaScript 脚本
  ```javascript
  // JavaScript 文件的动态加载函数封装
  function loadScript(url, callback){
    var script = document.createElement ("script")
    script.type = "text/javascript";
    if (script.readyState){ //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  // 调用
  loadScript("script.js", function(){
    console.log("File is loaded!");
  });
  // 加载多个
  loadScript("script1.js", function(){
    loadScript("script2.js", function(){
        loadScript("script3.js", function(){
            console.log("All files are loaded!");
        });
    });
  });
  ```


  #### 数据类型判断

  - 数组

    ```javascript
    // 判断arr是否为一个数组，返回一个bool值
    function isArray(arr) {
       return Object.prototype.toString.call(arr) === '[object Array]';
    }
    ```
    ECMAScript5，判断数组类型可以直接使用 <code>Array.isArray()</code>

  - 函数

    ```javascript
    // 判断fn是否为一个函数，返回bool值
    function isFn(fn) {
      return typeof(fn) === 'function';
    }
    ```
