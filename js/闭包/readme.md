# 什么是闭包

- 当函数可以记住并且访问所在的词法作用域时，就产生了闭包
- 闭包是函数和声明该函数的词法环境的组合
- 闭包是指有权访问另一个函数作用域中的变量的函数

# 闭包特点

- 一个是可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在函数调用后被自动清除。

# 如何创建闭包

- 将函数作为值传递

# 闭包与循环

```
for(var i=0;i<=2;i++){
    setTimeout(function timer(){
        console.log(i);
    },1000);
}
```

这里期望的是在1000毫秒之后输出0 1 2，但是实际情况确实在1000毫秒之后输出3 3 3

既然是因为没有块作用域造成的，那么就通过创建块作用域来解决，这里有两种办法，一个是用IIFE立即执行函数，另一个是用let：

IIFE 的三种解决方式

let 创建块作用域

# 模块

- 必须有一个外围函数
- 必须返回一个内部函数形成闭包
  
  运用上面讲到的闭包，我们可以实现模块机制，来看一个简单的例子：

```
function Module(){
    var something="cool";
    var another=[1,2,3];

    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join("-"));
    }

    return {
        doSomething:doSomething,
        doAnother:doAnother
    };
}
var aModule=Module();
aModule.doSomething();//cool
aModule.doAnother();//1-2-3
```

上面代码的这个模式，在JavaScript中被称为模块，通过调用Module()函数来创建一个模块实例，即通过调用这个函数，来创建内部作用域，返回一个保存内部函数引用的对象来形成闭包，这样相当于返回了模块的公共API。

当只需要一个实例时，可以用单例模式来实现（单例模式其实就是将模块函数转化成了IIFE）：
```
var sigleton=function(){
    var something="cool";
    var another=[1,2,3];

    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join("-"));
    }

    return {
        doSomething:doSomething,
        doAnother:doAnother
    };
}();
sigleton.doSomething();//cool
sigleton.doAnother();//1-2-3
```
单例模式通常用来为对象创建私有变量和私有函数，如下：
```
var sigleton=function(){
    var privateVar=10;//私有变量，外部无法访问
    function privateFunc(){//私有函数
        return false;
    }

    return{
        publicVar:"hahaha",//公共变量
        publicFunc:function(){//公共函数
            privateVar++;
            return privateFunc();
        }
    }
}();
console.log(sigleton.privateVar);//undefined
console.log(sigleton.publicVar);//"hahaha"
console.log(sigleton.publicFunc());//false
```
当然，模块返回的API也是函数，可以接受参数。甚至可以通过在模块实例内部保留对公共API对象的内部的引用，可以从内部对模块实例进行修改，包括添加或删除方法、属性，或者修改它们的值。
现代的模块机制

现在的模块机制通常都是将上面的模块定义封装进一个对使用者友好的API里，形成模块依赖加载器/管理器，下面来简单看下核心实现：
```
var MyModules=function(){
    var modules={};

    function define(name,deps,impl){
        for(var i=0;i<deps.length;i++){
            deps[i]=modules[deps[i]];
        }
        modules[name]=impl.apply(impl,deps);
    }

    function get(name){
        return modules[name];
    }

    return {
        define:define,
        get:get
    };
}();
```
再来看看如何使用：
```
MyModules.define("bar",[],function(){
    function hello(who){
        return "Let me introduce: "+who;
    }

    return {
        hello:hello
    };
});

MyModules.define("foo",["bar"],function(bar){
    var hungry="hippo";

    function awesome(){
        return bar.hello(hungry).toUpperCase();
    }

    return {
        awesome:awesome
    };
});

var bar=MyModules.get("bar");
var foo=MyModules.get("foo");

console.log(bar.hello("hippo"));//Let me introduce: hippo
console.log(foo.awesome());//LET ME INTRODUCE: HIPPO
```
简单讲解一下，MyModules是一个模块管理器，有两个公共API（define和get），一个用来定义模块，并将模块存储到MyModules内部，另一个用来根据模块名获取（从MyModules内部取出）模块。get没什么好说的，重点来看看define这个函数。
define(name,deps,impl)函数接受三个参数，通过第三个参数impl（一个函数，相当于前面讲到的Module()函数）来生成（或者说返回）名字为第一个参数name的模块，而第二个参数则是impl在生成模块时会用到的（依赖到的）其他（存储在MyModules这个管理器内部的）模块列表（是一个数组，里面列出了所有会依赖到的模块）。在define函数中，首先通过for循环来讲第二个参数中列出的模块从MyModules中取出放入deps数组中，最后，通过impl.apply(impl,deps)来最终生成名字为name的模块，并放入MyModules中。
未来的模块机制

未来的模块机制主要是指在ES6中引入的对模块的语法支持。ES6的模块没有“行内”格式，必须被定义在独立的文件中（一个文件是一个模块），浏览器或引擎有一个默认的模块加载器可以在导入模块是同步加载模块文件。如下：
```
bar.js

function hello(who){
    return "Let me introduce: "+who;
}
export hello;

foo.js

//仅从“bar”模块导入hello()
import hello from "bar";
var hungry="hippo";
function awesome(){
    return hello(hungry).toUpperCase();
}
export awesome;

baz.js

//导入完整的“foo”和“bar”模块
module foo from "foo";
module bar from "bar";
console.log(bar.hello("hippo"));
console.log(foo.awesome());
```
import可以将一个模块中的一个或多个API导入到当前的作用域中，并分别绑定在一个变量上（在上面的例子中是hello）。module会将整个模块的API导入并绑定到一个变量上（在上面的例子中是foo和bar）。export会将当前模块的一个标识符（变量或者函数）导出为公共API。
模块文件中的内容会被当作好像包含在作用域中一样来处理，就和前面讲的函数闭包模块一样。