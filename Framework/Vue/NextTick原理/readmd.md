# NextTick原理

## this.$nextTick的使用场景

在mounted之前进行dom操作，因为找不到对应的dom节点所以报错。
这种情况可以用this.$nextTick()解决
将进行操作的函数传给this.$nextTick()即可
$nextTick目的就是把传进来的函数延迟到dom更新后再使用
## 源码解读

如果支持promise用promise
如果支持MutationObserver用
如果都不支持用setTimeout
用闭包返回函数的调用