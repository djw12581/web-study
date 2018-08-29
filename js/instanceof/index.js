// console.log('aa' instanceof String) // 都说了判断引用类型，拿个基本类型出来坑爹么
// let obj_string = new String('aa');
// console.log(obj_string instanceof String)

// // 大家伙们都属于object
// console.log({} instanceof Object)
// console.log([] instanceof Array)
// console.log([] instanceof Object)
// console.log(function() {} instanceof Function)
// console.log(function() {} instanceof Object)

// function Foo(){} 
// function BFoo(){} 
// Foo.prototype = new BFoo();//JavaScript 原型继承
// let foo = new Foo();
// console.log(foo instanceof Foo);
// console.log(foo instanceof BFoo);
// console.log(Foo.prototype.__proto__ === BFoo.prototype);

console.log(String instanceof String); 
console.log(String.__proto__ ===  String.prototype); 
console.log(String.prototype.prototype === undefined ); 


// console.log(Object instanceof Object); 
// console.log(Function instanceof Function); 
// console.log(Function instanceof Object);

// function Foo(){} 
// function BFoo(){} 
// Foo.prototype = new BFoo();
// console.log(Foo instanceof Function);
// console.log(Foo instanceof Foo);