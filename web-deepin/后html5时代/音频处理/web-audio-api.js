// 创建 AudioContext 对象
// var audioCtx = new AudioContext();
// 兼容性写法
var audioCtx = new(window.AudioContext || window.webkitAudioContext)()
    // 创建音源 andioSource
    // 1 震动发生器创建
    // oscillator = audioCtx.createOscillator();
    // var gainNode = audioCtx.createGain();
    // 2 audio vadio 情况 myMediaElement 参数为 audio 节点对象
var myMediaElement = document.querySelector('audio');
var source = audioCtx.createMediaElementSource(myMediaElement);

// 3 webRTC 媒体流：可使用麦克风或摄像头
// 创建效果节点
var highShelf = audioCtx.createBiquadFilter();
var lowShelf = audioCtx.createBiquadFilter();
var highPass = audioCtx.createBiquadFilter();
var lowPass = audioCtx.createBiquadFilter();
// 输入与输出的连接（多个节点可以同时连接同一个节点。也可以让多个音源通过一个效果节点，达到混音的效果）
// source = audioCtx.createMediaStreamSource(stream);
// source.connect(analyser);
// analyser.connect(distortion);
// distortion.connect(biquadFilter);
// biquadFilter.connect(convolver);
// convolver.connect(gainNode);
// gainNode.connect(audioCtx.destination);
source.connect(highShelf);
highShelf.connect(lowShelf);
lowShelf.connect(highPass);
highPass.connect(lowPass);
lowPass.connect(audioCtx.destination);
// 播放与音调的设定
highShelf.type = "highshelf"; // 四种波形
highShelf.frequency.value = 4700; // 赫兹值
highShelf.gain.value = 50; // 音量

lowShelf.type = "lowshelf";
lowShelf.frequency.value = 35;
lowShelf.gain.value = 50;

highPass.type = "highpass";
highPass.frequency.value = 800;
highPass.Q.value = 0.7; // 不知道是什么值

lowPass.type = "lowpass";
lowPass.frequency.value = 880;
lowPass.Q.value = 0.7;