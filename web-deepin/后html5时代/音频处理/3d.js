var AudioContext = AudioContext || webkitAudioContext;
var context = new AudioContext;
//加载并播放音乐
var audio = new Audio("./kll.mp3");
var source = context.createMediaElementSource(audio);
var panner = context.createPanner();
//设置声源属性
panner.setOrientation(0, 0, 0, 0, 1, 0); //方向朝向收听者
var a = 0,
    r = 8;
setInterval(function() {
    //然声源绕着收听者以8的半径旋转
    panner.setPosition(Math.sin(a / 100) * r, 0, Math.cos(a / 100) * r);
    a++;
}, 16);
//连接：source → panner → destination
source.connect(panner);
panner.connect(context.destination);
//播放
audio.play();