# 高级函数之柯里化

## 什么是柯里化

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

## 柯里化实现

fn(a,b,c,d)=>fn(a)(b)(c)(d)
```
function curry(fn) {
    var args = [].silce.call(arguments, 1)
    return function() {
        var _args = args.concat([].slice.call(arguments));
        return fn.apply(null, _args);
    }
}


```
