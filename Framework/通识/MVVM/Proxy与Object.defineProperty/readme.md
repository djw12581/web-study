# Object.defineProperty问题

只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历

# Proxy

可以劫持整个对象，并返回一个新对象
有13种劫持操作
Proxy是es6提供的，兼容性不好,无法用polyfill磨平

**Proxy使用：**

es6提供proxy构造函数，第一个参数target:是所要代理的目标对象，可以是空对象。第二个handler是拦截器，一个拦截器可以有多个拦截操作

var proxy = new Proxy(target, handler);