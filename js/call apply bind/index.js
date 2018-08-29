绑定失效的情况
//箭头函数没有自己的this，这里指向foo的this
function foo() {
    return () => {
        return () =>{
            return () =>{
                console.log('id:',this.id)
            }
        }
    }
  }

var f = foo.call({id:1})
var t1 = f.call({id:2})()()
var t2 = f().call({id:2})()