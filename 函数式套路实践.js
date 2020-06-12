var fs = require('fs');
const log = console.log.bind(this)

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

const Left = (x) => ({
    map: f => Left(x),            // 忽略传入的 f 函数
    fold: (f, g) => f(x),         // 使用左边的函数
    inspect: () => `Left(${x})`,  // 看容器里有啥
    chain: f => Left(x)           // 和 map 一样，直接返回 Left
})

const Right = (x) => ({
    map: f => Right(f(x)),        // 返回容器为了链式调用
    fold: (f, g) => g(x),         // 使用右边的函数
    inspect: () => `Right(${x})`, // 看容器里有啥
    chain: f => f(x)              //直接返回，不使用容器再包一层了
})

const tryCatch = (f) => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}

const is = {
    empty: function (x) {
        return x === '';
    },
}

const validateAble = (x, validateFn) => validateFn(x) ? Left(x) : Right(x)

const findColor = (name) => ({
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#fff68f',
})[name]

const double = x => x * 2
const discount = x => x * 0.8
const coupon = x => x - 50

const setPort = (props) => {
    const status = tryCatch(() => fs.readFileSync('D:/work-space/apollo-light/ui/www/proxy/a.json'))
        .chain(c => tryCatch(() => JSON.parse(c)))
        .fold(e => '格式错误', c => c.status)
    return props + status
}

const result = validateAble('1', compose(is.empty))
    .map(compose(coupon, discount, double, setPort))
    .fold(e => '参数是空值', c => c)
    // .inspect()

log(result)