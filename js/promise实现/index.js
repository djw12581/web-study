var Pro = function (time) {
    //返回一个Promise对象
    return new Promise(function (resolve, reject) {
        console.log('123');
        //模拟接口调用
        setTimeout(function () {
            //这里告诉Promise 成功了，然后去执行then方法的第一个函数
            resolve('成功返回');
        }, time);
    })
};
(function () {
    console.log('start');
    Pro(3000)
        .then(function (data) {
            console.log(data);
            return Pro(5000);
        })
        .then(function (data) {
            console.log(data);
            console.log('end');
        })
})();

