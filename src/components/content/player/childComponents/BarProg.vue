<template>
  <div id="bar-prog-container">
    <span class="bar-time">{{currentTime | formatTime}}</span>
    <div class="bar-strip" ref="bar" :style="{background: backgroundStyle}">
      <span class="strip-icon" ref="icon"></span>
    </div>
    <span class="bar-time">{{duration | formatTime}}</span>
  </div>
</template>

<script>
  export default {
    name: 'BarProg',
    props: {
      value: Number,
      currentTime: Number,
      duration: Number,
    },
    watch: {
      value: {
        handler() {
          // 组件渲染好后就再调用一次
          this.$nextTick(() => {
            // 调整icon初始的位置
            this.$refs.icon.style.transform = `translate(${this.max * this.value}px, -50%)`;
          })
        },
        immediate: true, //初始化后就执行
      }
    },
    mounted() {
      this.touchEvents();
    },
    computed: {
      // 根据value的变化修改背景线性渐变效果
      backgroundStyle() {
        const percent = this.value * 100;
        return `linear-gradient(to right, #f00 0%, #f00 ${percent}%, #fff ${percent}%, #fff 100%)`;
      }
    },
    // 过滤器的声明,使用过滤器不会改变数据
    filters: {
      formatTime(value) {
        // 计算分钟数 Math.floor: 向下取整
        let mins = Math.floor(value / 60);
        let second = Math.floor(value % 60);
        second = second > 9 ? second : ('0' + second)
        return mins + ':' + second
      }
    },
    methods: {
      touchEvents() {
        // 操作dom，添加移动端触摸事件
        const bar = this.$refs.bar;
        const icon = this.$refs.icon;
        // 计算可以移动的长度
        const max = (this.max = bar.offsetWidth - icon.offsetWidth);
        
        let curX = max * this.value; //记录每一次偏移后的位置
        let offsetX = 0; //偏移量 
        // 添加触摸事件
        // 基于触摸开始事件上在监听停止和移动事件
        icon.addEventListener('touchstart', (event) => {
          // 告诉外部触摸开始了
          this.$emit('touchStart')
          // 记录开始的位置
          const startX = event.changedTouches[0].clientX;
          const touchmoveCb = (event) => {
          // 计算偏移量
          offsetX =  event.changedTouches[0].clientX - startX;
          offsetX = offsetX + curX; //叠加上一次的位置
          // 约束偏移量
          if(offsetX < 0) {
            offsetX = 0
          };
          if(offsetX > max) {
            offsetX = max
          };
          // 手指移动多少，就让icon标签在当前位置跟着偏移多少
          icon.style.transform = `translate(${offsetX}px, -50%)`;
          // 计算进度的百分比
          const progress = offsetX / max;
          // 将数据传出去
          this.$emit('input', progress);
        };
          const touchendCb = (event) => {
            curX = offsetX; //记住了这次的偏移
            // 告诉外部触摸开始了
            this.$emit('touchEnd')
            // 移除监听
            document.removeEventListener('touchmove',touchmoveCb );
            document.removeEventListener('touchend',touchendCb );
          };
          // 添加监听
          document.addEventListener('touchmove', touchmoveCb);
          document.addEventListener('touchend', touchendCb);
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  #bar-prog-container {
    width: 80%;
    margin: 40px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bar-strip {
    margin: 0 10px;
    flex: 1;
    height: 4px;
    background: #fff;
    position: relative;
    .strip-icon {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      width: 16px;
      height: 16px;
      border: 6px solid #fff;
      background: #f00;
      border-radius: 50%;
      // 扩大标签作用域
      &::before {
        content: '';
        position: absolute;
        top: -25px;
        left: -25px;
        right: -25px;
        bottom: -25px;
      }
    }
  }
  .bar-time {
    color: #ccc;
    font-size: 22px;
    width: 60px;
    text-align: center;    
  }
</style>