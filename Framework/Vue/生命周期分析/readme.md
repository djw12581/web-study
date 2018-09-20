# vue 生命周期分析

## 有哪些阶段

beforeCreate // 创建前
created      // 创建完毕
beforeMount  // 挂载前
mounted      // 挂载完毕
beforeUpdate // 更新前
updated      // 更新完毕
beforeDestroy// 销毁前
destroyed    // 销毁完毕

异步数据的请求适合在created的钩子中使用，例如初始化。

任何（所有）数据更新完毕：如果对数据更新做统一处理，在updated钩子中做。如果想区分不同的数据更新使用NextTick函数，针对每一次变化做不同的处理，更新数据后立即操作dom。

watch则是对具体的属性，当他更新的时候，触发。监听具体数据的变化，并做相应的处理。

mounted：挂载元素内dom节点的获取