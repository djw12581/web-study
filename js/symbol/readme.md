# symbol是什么？

symbol是一种新的原始数据类型Symbol，表示独一无二的值。
Symbol 值通过Symbol函数生成。
凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。

**注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。**

**注意，Symbol 值作为对象属性名时，不能用点运算符。**

**注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。**

# symbol实现私有化

```
var Person = (function() {
    var nameSymbol = Symbol('name');
 
    function Person(name) {
        this[nameSymbol] = name;
    }
 
    Person.prototype.getName = function() {
        return this[nameSymbol];
    };
 
    return Person;
}());
```

# class symbol如何实现私有化

```
var Person = (function() {
    let _name = Symbol();
    class Person {
        constructor(name) {
            this[_name] = name;
        }
        
        get name() {
            return this[_name];
        }
    }
    return Person;
})();
```
