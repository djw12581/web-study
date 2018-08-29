# new调用

任何函数都可以通过new调用，这种调用方式叫做 **构造器调用**

- 当使用new调用时
    - 创建一个对象
    - 将对象接入原型链
    - 将this指向该对象(修改this绑定)
    - 自动返回这个对象或该对象自己的其他对象
  
`var obj = new Base();`

等价于

`var obj  = {};`

`obj.__proto__ = Base.prototype;`

`Base.call(obj);`

- 使用 Object.create(Base)
  
`var obj  = {};`

`obj.prototype = Base.prototype;`

`obj.__proto__ = Base;`

建立委托，可以调用其他对象的方法