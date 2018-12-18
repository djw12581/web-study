# 基本思路

1.创建AudioContext对象

2.在AudioContext对象内设置音源，例如<audio>标签，震动发声器，音频流

3.创建effect node（效果节点）。例如reverb, biquad filter, panner, compressor（这些都是音频特效）

4.选择音频的最终输出节点。例如，你的电脑的扬声器

5.音频经过效果节点处理后，然后输出到下一个节点，这些节点连接起来

6.canvas 绘制