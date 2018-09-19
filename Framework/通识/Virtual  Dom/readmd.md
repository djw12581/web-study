# Virtual Dom（虚拟dom树）

## 什么是虚拟dom

用js对象模拟dom节点，用来解决频繁操作dom造成的资源占用,页面卡顿等问题。数据频繁更新时，虚拟DOM的目的是将所有操作累加起来，统计计算出所有的变化后，统一更新一次DOM。计算变化使用了diff算法，找出最少更改。

## 类似的减少回流重绘的办法

最常用的方法是使用文档片段（DocumentFragment）作为参数（例如，任何 Node 接口类似 Node.appendChild 和 Node.insertBefore) 的方法），这种情况下被添加(append)或被插入(inserted)的是片段的所有子节点, 而非片段本身。因为所有的节点会被一次插入到文档中，而这个操作仅发生一个重渲染的操作，而不是每个节点分别被插入到文档中，因为后者会发生多次重渲染的操作。

[mdn 链接](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)