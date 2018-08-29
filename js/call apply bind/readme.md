# 硬绑定

call()和apply()

现在我们说一说 call 方法和 apply 方法。他们的第一个参数都是需要调用的函数对象，在函数内这个参数就是this的值。call 和 apply 的区别在于 call 传的值可以是任意的，而 apply 传的值必须是数组。

- 他们都是调用一个对象的方法，以另一个对象替换当前对象。

bind()

- bind 的返回值是函数
- 参数的使用
```
  function fn(a, b, c) { console.log(a, b, c); } 
  var fn1 = fn.bind(null, 'Dot'); 
  fn('A', 'B', 'C'); // A B C 
  fn1('A', 'B', 'C'); // Dot A B 
  fn1('B', 'C'); // Dot B C 
  fn.call(null, 'Dot'); // Dot undefined undefined
```
# call apply模拟实现

所以我们模拟的步骤可以分为：

    将函数设为对象的属性

    执行该函数

    删除该函数
