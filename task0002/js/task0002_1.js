/**
 * JavaScript Input Keyword
 * @author sandman.csser@foxmail.com
 * @date 2016.08.17
 */


(function(){

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


    inputKeyword($('js-inputKeyword'), $('js-sendBtn'));

    function inputKeyword(input, btn) {

        btn.onclick = function(e) {
            var value = trim(input.value);
            // var keyword_array = value.split(','); // split() 方法用于把一个字符串分割成字符串数组
            var keyword_array = value.split(/\n|\s|\ |\，|\,|\、|\;/);

            keyword_array = uniqArray(keyword_array); // 去重
            keyword_array = filterArray(keyword_array); // 过滤数组中的空值

            var output = keyword_array.join(','); // join() 方法用于把数组中的所有元素放入一个字符串

            var p = document.createElement('p');
            p.innerHTML += output;
            console.log(output);

            insertAfter(p, e.target);

        }
    }

})();
