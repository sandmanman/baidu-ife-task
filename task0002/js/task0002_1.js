/**
 * JavaScript Input Keyword
 * @author sandman.csser@foxmail.com
 * @date 2016.08.17
 */


(function(){

    "use strict";
    
    // util
    function filterArray(arr) {
        var result = [];
        for (var i = 0, al = arr.length; i < al; i++) {
            if (arr[i]) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent) {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
        return newElement;
    }

    function showMsg(msg) {
        if ( msg ) {
            $('help-block').innerHTML = msg;
        } else {
            $('help-block').innerHTML = '';
        }
    }

    function inputKeyword(e) {

        var value = trim($('js-inputKeyword').value);
        if ( !value ) {
            return $('js-inputKeyword').focus();
        }
        // var keyword_array = value.split(','); // split() 方法用于把一个字符串分割成字符串数组
        var keyword_array = value.split(/\n|\s|\ |\，|\,|\、|\;/);

        keyword_array = uniqArray(keyword_array); // 去重
        keyword_array = filterArray(keyword_array); // 过滤数组中的空值

        //console.log(arr_length);
        if ( keyword_array.length > 5 ) {
            showMsg('输入兴趣爱好不能超过5个');
            $('js-inputKeyword').focus();
            return;
        }

        for (var i=0; i<keyword_array.length; i++) {
            var tag = document.createElement('span');
            //var delEle = document.createElement('button');
            tag.className = 'btn btn-secondary btn-sm m-r-1';
            //delEle.className = 'close';
            //delEle.id = 'kw-' + i;
            //delEle.innerHTML = '&times;';
            tag.innerHTML = keyword_array[i];
            //tag.appendChild(delEle);
            $('js-showKeyword').appendChild(tag);
        }

        // var output = keyword_array.join(','); // join() 方法用于把数组中的所有元素放入一个字符串

        // var ele = document.createElement('div');
        // ele.className = 'm-t-1';
        // ele.innerHTML = output;
        // console.log(output);

        //insertAfter(ele, e.target);
    }

    function removeKeyword(parentEle, childEle) {
        return parentEle.removeChild(childEle);
    }

    $('js-sendBtn').onclick = inputKeyword;

})();
