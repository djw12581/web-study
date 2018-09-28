// var ws = new WebSocket("wss://echo.websocket.org");
var ws = new WebSocket("ws://127.0.0.1:5500");

ws.addEventListener('open', function (ev) {  
    console.log('打开连接')
    ws.send("Hello WebSockets!");
})

ws.addEventListener('message', function (ev) {  
    console.log( "收到的消息是: " + ev.data);
    ws.close();
})

ws.addEventListener('close', function (ev) {  
    console.log("连接关闭");
})

