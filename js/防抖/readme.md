# js高级函数之防抖函数

**什么是防抖？**

dom事件会频繁触发多次，诸如（mousemove），如果事件的回调复杂，程序的执行会变得缓慢；
解决办法是：将一段时间内，同种类型的事件合并成一个事件，然后将这一个事件延迟触发。
这种办法的通用函数叫做防抖函数（Debounce）

**防抖函数的实现**

```
/**
*
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
*/
function debounce(fn, delay) {
  var timer // 定时器，用来 setTimeout
            // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
            // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments
            // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)
            // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
            // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
```

总结

debounce 强制函数在某段时间内只执行一次，throttle 强制函数以固定的速率执行。在处理一些高频率触发的 DOM 事件的时候，它们都能极大提高用户体验。