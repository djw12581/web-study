# 事件机制

事件捕获：当某个元素触发某个事件（如onclick），顶层对象document就会发出一个事件流，随着DOM树的节点向目标元素节点流去，直到到达事件真正发生的目标元素。在这个过程中，事件相应的监听函数是不会被触发的。

事件目标：当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。

事件起泡：从目标元素开始，往顶层元素传播。途中如果有节点绑定了相应的事件处理函数，这些函数都会被一次触发。如果想阻止事件起泡，可以使用e.stopPropagation()（Firefox）或者e.cancelBubble=true（IE）来组织事件的冒泡传播。

## 事件触发的三个阶段

标准事件流：

事件捕获 => 事件触发 => 事件冒泡 => 事件的默认行为

IE事件流：

事件触发 => 事件冒泡

## 注册事件

标准：
```
target.addEventListener('', fn, true);  //第三个参数指定在冒泡阶段
target.removeEventListener(type, listener, useCapture)
```
IE：
```
target.attachEvent(type, listener)
target.detachEvent(type,listener)
```

## 事件代理

```
// 获取父节点，并为它添加一个click事件
document.getElementById("parent-list").addEventListener("click",function(e) {
  // 检查事件源e.targe是否为Li
  if(e.target && e.target.nodeName.toUpperCase == "LI") {
    // 真正的处理过程在这里
    console.log("List item ",e.target.id.replace("post-")," was clicked!");
  }
});
```