# js模块化发展

早期随着代码越来越多，页面上需要加载的js文件越来越多，产生问题：
- 浏览器等待加载时间过长 
- 各文件之间的依赖关系复杂。
- 全局变量污染和变量重名

## 什么是模块化？

模块化是一种规范一种约束，可以提升开发效率。将每个js文件看作是一个模块，每个模块通过固定的方式引入，并且通过固定的方式向外暴露指定的内容

## 模块化解决方案

- 闭包与命名空间
    - 将每个js文件用IIFE包裹，使得各个文件在不同的词法作用域相互隔离，最后通过闭包的方式暴露变量。
    - 这种方式仍然需要在入口处严格保证加载顺序
- 面向对象开发
  
```
//面向对象的插件封装
(function(win){
    var LightBox = function(){
        // ...
    };
    
    LightBox.prototype = {
        a:function(){
            console.log('ss')
            return this
        }
    };
    // return LightBox
    win.LightBox = LightBox;   
})(window)

var o = new LightBox()
```
- commonJS
    - 原生Module对象，每个文件都是一个Module实例
    - 文件内通过require对象引入指定模块
    - 所有文件加载均是同步完成
    - 通过module关键字暴露内容
    - 每个模块加载一次之后就会被缓存
    - 模块编译本质上是沙箱编译
    - 由于使用了Node的api，只能在服务端环境上运行
  ```
    // a.js
    var c = require('./c');

    module.exports = {
        aStr: 'aa',
        aNum: c.cNum + 1
    };
  ```
  Commonjs基于Node原生api在服务端可以实现模块同步加载，但是仅仅局限于服务端，客户端如果同步加载依赖的话时间消耗非常大，所以需要一个在客户端上基于Commonjs但是对于加载模块做改进的方案，于是AMD规范诞生了。

- AMD规范

意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到所有依赖加载完成之后（前置依赖），这个回调函数才会运行。
```
require(['math'], function (math) {

    math.add(2, 3);
});
```
- RequireJs(AMD的实现)
    - 依赖前置：`动态创建<script>引入依赖，在<script>标签的onload事件监听文件加载完毕；一个模块的回调函数必须得等到所有依赖都加载完毕之后，才可执行，类似Promise.all。`
    - 配置文件：`有一个main文件，配置不同模块的路径，以及shim不满足AMD规范的js文件`
```
配置文件main.js

requirejs.config({
    shim: {
        // ...
    },
    paths: {
        a: '/a.js',
        b: '/b.js',
        c: '/c.js',
        index: '/index.js'
    }
});

require(['index'], function(index){
    index();
});

a.js

define('a', ['c'], function(c){
    return {
        aStr: 'aa',
        aNum: c.cNum + 1
    }
});
页面中嵌入

<script src="/require.js" data-main="/main" async="async" defer></script>
```
require优点 动态并行加载js，依赖前置，无需再考虑js加载顺序问题

- CMD和SeaJs
    - 与AMD相比非常类似，CMD规范（2011）具有以下特点：
        - define定义模块，require加载模块，exports暴露变量。
        - 不同于AMD的依赖前置，CMD推崇依赖就近（需要的时候再加载）
        - 推崇api功能单一，一个模块干一件事。

-  ES6中的模块化

有两点主要的区别：

    CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
```
import {cNum} from './c';

export default {
    aStr: 'aa',
    aNum: cNum + 1
};
```

    
    
    


