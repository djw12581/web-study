// 监听器函数 递归遍历（因为要检测所有属性）
function observe(data) {
    if (!data || typeof data != 'object') {
        return;
    }

    //取出所有属性遍历

    Object.keys(data).forEach(function (key) {
        // console.log(data[key])
        // 调用监听函数 添加get和set
        defineReactive(data, key, data[key]);
    })
};

// 监听函数 给所有数据对象添加get和set
function defineReactive(data, key, val) {
    var dep = new Dep();
    // 属性值是对象的情况 监听子属性
    observe(val);
    Object.defineProperty(data, key, {
        enumerable: true, //可枚举
        configurable: false, //不可配置
        // 读取时执行
        get: function () {
            // 守护操作符&& 模拟if语句
            Dep.target && dep.addDep(Dep.target)
            return val;
        },
        // 赋值时执行
        set: function (newVal) {
            if (val === newVal) {
                return
            } else {
                console.log('哈哈哈。监听到值变化了', val, '-->', newVal);
                val = newVal;
                dep.notify(); // 通知所有订阅者 
            }
        }
    })
}

// 存放订阅者的数组
function Dep() {
    this.subs = [];
}

Dep.prototype = {
    // 添加订阅者方法
    addSub: function(sub) {
        this.subs.push(sub);
    },
    // 通知订阅者方法
    notify: function() {
        console.log('数据更新了')
        this.subs.forEach(function(sub) {
            sub.update(); 
        });
    }
}

// 数据变化的一个例子
var data = {
    name: 'observer'
};
observe(data);
data.name = 'observer-'; //监听到值变化了observer--->observer-了