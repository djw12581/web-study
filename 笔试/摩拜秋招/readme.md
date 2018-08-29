# 摩拜2018校招前端工程师笔试卷

## 描述一下 css 盒模型

容器由content + padding + border + margin 组成

标准盒模型：width = content 

ie盒模型： width = content + padding + border

## 字符串复制

```
return new Array(num+1).join(str)
return str.repeat(num);
```

## 如何获取一个元素节点的父元素，找到之后如何删除这个元素节点

document.querySelector('#test').parentNode;
document.querySelector('#test').parentNode.remove();

## 编写一个 js 函数 jsonp 的处理函数

```
// 手写jsonp
function myCallback(data) {
    console.log(data)
}
 
function jsonp(url, data, callback) {
    // data是否是字符串，是的话证明data值就是函数名
    if (typeof data == 'string') {
        callback = data
        data = {}
    }
    // 拼接data
    var hasParams = url.indexOf('?')
    url += hasParams ? '&' : '?' + 'callback=' + callback
    var params;
    for (var i in data) {
        params += '&' + i + '=' + data[i]
    }
    url += params
    // 在页面插入script标签
    var script = document.createElement('script')
    script.setAttribute('src', url)
    document.querySelector('head').appendChild(script)
 
}
 
jsonp('http://baidu.com', { id: 34 }, 'myCallback')
```
## 编写一个函数判断参数是否是数组类型，如果是返回 true

```
<!-- // return a instanceof Array
    // return Array.isArray(a);
    // return Object.prototype.toString.call(a) == '[object Array]' -->
```

##  一般和后端 API 服务通信的方式有哪些？POST 提交的时候，content-type 有哪几种 

content-type:

application/x-www-form-urlencoded 

multipart/form-data

application/json

text/xml 

## 如何获取 url 中的 query 字段对应的值 

```
query=(url)=>{
let str=url.split('?')[1];
if(str){
let res=str.split('=')[1];
}
}

```
## 对前端工程化的理解，以及任意构建工具(webpack、gulp、grunt、rollup)的某一个使用的一些描述

## 下面是 IE 支持的 event 方法 

returnValue 清除默认事件

srcElement 在 IE 中 srcElement 表示产生事件的源，比如是哪个按钮触发的 onclick 事件，FF 中则是 target。

IE 中可以直接使用 event 对象，而 FF 中则不可以，