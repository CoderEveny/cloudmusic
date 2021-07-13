<template>
  <!-- 圆形进度条 -->
  <div id="circle-prog-container">
    <canvas class="canvas" ref="canvas"></canvas>
    <i class="cloud" @click="changeAction" 
    :class="{'cloud-bofang': !value, 'cloud-zanting': value}"></i>   
  </div>
</template>

<script>
  export default {
    name: 'CircleProg',
    props: {
      value: Boolean,
      progress: Number
    },
    watch: {
      progress() {
        this.renderCicle()
      }
    },
    mounted() {
      const canvas = this.$refs.canvas; //获得canvas标签
      // 设置画布大小
      canvas.width = 64;
      canvas.height = 64;
      // 绘制画布的上下文
      this.context = canvas.getContext('2d');
      this.renderCicle()
    },
    methods: {
      changeAction() {
        this.$emit('input', !this.value)
      },
      renderCicle() {
        // 清除上一次的绘制
        // 清除画布内容：前两个参数是起始点坐标，后面是画布宽高 
        this.context.clearRect(0, 0, 64, 64);
        // 绘制圆环
        this.context.save(); //保存对canvas样式的操作
        this.context.beginPath();  //开始描绘路径
        // 绘制大圆
        this.context.moveTo(34, 34); //圆心
        this.context.arc(34, 34, 30, 0, Math.PI * 2, false);
        this.context.lineTo(34, 34);
        // 绘制小圆
        this.context.moveTo(34, 34); //圆心
        // arc: 前两位参数是圆心坐标，第三个参数是半径， 第四个参数是起始方向 0位x轴
        this.context.arc(34, 34, 24, 0, Math.PI * 2, false);
        this.context.lineTo(34, 34);
        this.context.closePath();
        this.context.fillStyle = 'rgba(162, 163, 164, 0.4)' //填充的颜色
        this.context.fill('evenodd') //镂空填充
        this.context.restore() //恢复canvas样式

        // 绘制圆弧
        this.context.save(); //保存对canvas样式的操作
        this.context.beginPath();  //开始描绘路径
        const startAng = Math.PI / 180 * (-90); //起始角度
        const endAng = startAng + (Math.PI / 180 * 360 * this.progress); //终止角度
        // 绘制大扇形
        // 角度转弧度： π/180 * 角度
        this.context.moveTo(34, 34); //圆心
        this.context.arc(34, 34, 30, startAng, endAng, false);
        this.context.lineTo(34, 34);
        // 绘制小扇形
        this.context.moveTo(34, 34); //圆心
        this.context.arc(34, 34, 26, startAng, endAng, false);
        this.context.lineTo(34, 34);
        this.context.closePath();
        this.context.fillStyle = 'rgba(212, 68, 57, 1)' //填充的颜色
        this.context.fill('evenodd') //镂空填充
        this.context.restore() //恢复canvas样式
      }
    },
  }
</script>

<style lang="less" scoped>
  #circle-prog-container {
    width: 80px;
    height: 80px;
    position: relative;
    .cloud {
      position: absolute;
      top: 52%;
      transform: translate(-50%, -50%); //css3在不知道自身宽高的情况下,水平垂直居中
      
    }
    .cloud.cloud-zanting { 
      left: 53%;  
    }
    .cloud.cloud-bofang {
      left: 55%;
    }
    // 注意：不能在css中对画布canvas设置宽高
    // 因为设置了大小是对画布进行了拉伸，宽高要放到js中
    .canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>