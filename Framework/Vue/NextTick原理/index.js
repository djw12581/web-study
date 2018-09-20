var nextTick = (function () {
    //存储需要触发的回调函数
    var callbacks = [];
    //是否正在等待的标志（false:允许触发在下次事件循环触发callbacks中的回调,
    // true: 已经触发过,需要等到下次事件循环）
    var pending = false;
    //设置在下次事件循环触发callbacks的触发函数
    var timerFunc;
    //处理callbacks的函数
    function nextTickHandler() {
        // 可以触发timeFunc
        pending = false;
        //复制callback
        var copies = callbacks.slice(0);
        //清除callback
        callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            //触发callback的回调函数
            copies[i]();
        }
    }
    //如果支持promise，使用promise实现
    if (typeof Promise !== 'undefined' && isNative(promise)) {
        var p = Promise.resolve();
        var logError = function (err) {
            console.error(err);
        };
        timerFunc = function () {
            p.then(nextTickHandler).catch(logError);
            //iOS的webview下，需要强制刷新队列，执行上面的回调函数
            if (isIOS) {
                setTimeout(noop);
            }
        };
        //    如果Promise不支持，但支持MutationObserver
        //    H5新特性，异步,当dom变动是触发,注意是所有的dom都改变结束后触发
    } else if (typeof MutationObserver !== 'undefined' && (
            isNative(MutationObserver) ||
            MutationObserver.toString() === '[object MutationObserverConstructor]')) {
        var counter = 1;
        var observer = new MutationObserver(nextTickHandler);
        var textNode = document.createTextNode(String(counter));
        observer.observe(textNode, {
            characterData: true
        });
        timerFunc = function () {
            counter = (counter + 1) % 2;
            textNode.data = String(counter);
        };
    } else {
        //上面两种都不支持，用setTimeout
        timerFunc = function () {
            setTimeout(nextTickHandler, 0);
        };
    }
    //nextTick接收的函数，参数1：回调函数 参数2：回调函数的执行上下文
    return function queueNextTick(cb, ctx) {
        //用于接收触发Promise.then中回调的函数
        //向回调函数中pushcallback
        var _resolve;
        callbacks.push(function () {
            //如果有回调函数，执行回调函数
            if (cb) {
                cb.call(ctx);
            }
            //触发Promise的then回调
            if (_resolve) {
                _resolve(ctx);
            }
        });
        //是否执行刷新callback队列
        if (!pending) {
            pending = true;
            timerFunc();
        }
        //如果没有传递回调函数，并且当前浏览器支持promise，使用promise实现
        if (!cb && typeof Promise !== 'undefined') {
            return new Promise(function (resolve) {
                _resolve = resolve;
            })
        }
    }
})