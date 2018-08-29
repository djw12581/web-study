// function times (a){
//     return a instanceof Array
//     return Array.isArray(a);
//     return Object.prototype.toString.call(a) == '[object Array]'
// }

// console.log(times([]))


// 写一个jsonp函数，有三个参数
// 一个是url
// 一个用来接收请求的数据
// 一个回调函数
(function (window,document) {
    var jsonp = function (url, data, callback) {
        var newUrl = `${url}?callback=${callback}`
        // console.log(newUrl)
        //动态script
        var scriptElement=document.createElement('script')
        scriptElement.src=newUrl
        // 此时还不能将其append到页面上

        //5 将script标签放到页面中
        document.body.appendChild(scriptElement)
        // var head = document.querySelector('head')
        // head.insertAdjacentHTML('beforeend', `<script type='text/javascript' src=${newUrl}></script>`)
    }
    window.$jsonp = jsonp;
})(window,document)

// function jsonp(url, data, callback) {
//     //url拼接，请求参数
//     var newUrl = `${url}?callback=${callback}`
//     console.log(newUrl)
//     //动态script
//     var head = document.querySelector('head')
//     head.insertAdjacentHTML('beforeend', `<script type='text/javascript' src=${newUrl}></script>`)
// }


// jsonp('http://api.douban.com/v2/movie/in_theaters', {
//     count: 3
//   }, function (data) { console.log(data) })

// function myCallback(data) {
//     console.log(data)
// }

// function jsonp(url, data, callback) {
//     // data是否是字符串，是的话证明data值就是函数名
//     if (typeof data == 'string') {
//         callback = data
//         data = {}
//     }
//     // 拼接data
//     var hasParams = url.indexOf('?')
//     url += hasParams ? '&' : '?' + 'callback=' + callback
//     var params;
//     for (var i in data) {
//         params += '&' + i + '=' + data[i]
//     }
//     url += params
//     // 在页面插入script标签
//     var script = document.createElement('script')
//     script.setAttribute('src', url)
//     document.querySelector('head').appendChild(script)

// }

// jsonp('http://api.douban.com/v2/movie/in_theaters', {
//         count: 3
//       },  'myCallback')