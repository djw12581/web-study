# 函数式编程实践

## 需要解决哪些问题

1.  如何面向过程
2.  如何保证函数是纯的
3.  如何进行错误处理

## 面向过程编程 -- 函数组合

期望：获取一段数据 -> 依次执行若干个函数 -> 返回一段数据（不修改原数据）

```
const compose = function () {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
        fns[_key] = arguments[_key];
    }

    return function (value) {
        return fns.reduce(function (acc, fn) {
            return fn(acc);
        }, value);
    };
}
```
说明：const newData = compose(add, delete, update)(oldData) // add, delete, update为三个方法

## 保证原数据不可变 -- 容器

期望：每个功能函数内部逻辑不会影响原始数据

```
const Box = (x) => ({
    map: f => Box(f(x)),         // 存
    fold: f => f(x),             // 取
})
```
说明：map 方法映射值存入同类型容器中 / fold 从容器中取值

demo ----------------- 组合+容器

```
const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
})

const a = x => x + 2
const b = x => x * 3
const c = x => x / 2

const result = Box(2)
    .map(compose(a, b, c))
    .fold(x => x)

console.log(result) // 4
```

## 函数式错误处理 -- 函子

问题：try-catch 中捕获异常导致函数不纯 / 可能出现嵌套的异常处理

期望：链式 + 一次抛出

```
const Left = (x) => ({
    map: f => Left(x),
    fold: (f, g) => f(x),         
})

const Right = (x) => ({
    map: f => Right(f(x)),        
    fold: (f, g) => g(x),      
})

const tryCatch = (f) => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}

const status = tryCatch(() => fs.readFileSync('D:/work-space/apollo-light/ui/www/proxy/a.json'))
        .map(compose(step1, step2))
        .fold(e => '格式错误', c => c.status)
```
说明：有异常的时候不执行，反之执行;fold 第一个参数为错误时执行的函数

## 方法中的特殊处理

场景1：映射函数中处理判断逻辑和处理副作用

```
const validateAble = (x, validateFn) => validateFn(x) 
const is = {
    empty: x => x === '',
}

const getUser = client => {
    const user = tryCatch(() => fs.readFileSync(
        'E:/react/react-admin/user.json'
    ))
    .map(c => JSON.parse(c))
    .fold(e => e, c => c.user)

    client.user = user

    return client
}

const getData = x => {
    const data = tryCatch(() => fs.readFileSync(
        'E:/react/react-admin/data.json'
    ))
    .map(compose(c => JSON.parse(c), getUser))
    .fold(e => e, c => c)

    client.data = data

    return client
}

const selectClient = client => {
    if(validateAble(client, is.empty)) { return client}

    const result = Box(client).map(compose(getData)).fold(x => x)

    return result
}

selectClient(...)
```
场景2：去除 if/else

```
const validateAble = (x, validateFn) => validateFn(x) ? Left(x) : Right(x)
const is = {
    empty: x => x === '',
    one: x => x === '1',
}
const init = x => {
    const oneResult = validateAble(x, is.one)
        .map(compose(step1, step2, step3))
        .fold(e => `是1 ${e}`, c => c)

    const oneResult = validateAble(x, is.empty)
        .map(compose(step1, step2))
        .fold(e => `是空 ${e}`, c => oneResult)

    return result
}
log(init('1'))
```

