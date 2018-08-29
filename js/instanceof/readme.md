# instanceof

在JS中，用typeof来判断基本类型，instanceof判断引用类型(true/false)

先看MDN里面的解释，左边是要测试的对象，右边是构造函数 是否能在对象的原型链上（顺着__proto__一直往上找）找到构造函数的原型属性（[constructor].prototype）

console.log(Object instanceof Object); // true

再看instanceof的实现代码
```
function instance_of(L, R) {//L 表示左边的object，R 表示右边的constructor
 const R_P = R.prototype;// 取 R 的显式原型
 L = L.__proto__;// 取 L 的隐式原型,并且可能会顺着原型链重新赋值
 while (true) { 
   if (L === null) 
     return false; 
   if (R_P === L)// 这里重点：严格比较 true 
     return true; 
   L = L.__proto__; 
 } 
}
```
1、第一轮赋值

首先，左右表达式赋值
```
L = Object
R = Object
R_P = Object.prototype = Object.prototype
L = Object.__proto__ = Function.prototype
```
2、第一次判断

L !== null => R_P !== L
判断不为true
继续寻找L的原型链，准备下一轮赋值
3、第二轮赋值

L = Function.prototype.__proto__  =  Object.prototype

4、第二次判断

L !== null => R_P === L

return true