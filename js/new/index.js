var Base = function () {
    this.a = 2
    // this.b = 5
}
Base.prototype.a = 3;
Base.prototype.b = 3;
var o1 = new Base();
var o2 = Object.create(Base);
// o2.a = 5
console.log(o1.a);
console.log(o1.b);
console.log(o2.prototype.a);
console.log(o2.a);
console.log(o2.prototype === Base.prototype);
console.log(o2.__proto__ === Base);
console.log(o1.__proto__ === Base.prototype);

