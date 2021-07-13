/**
 * postcss的配置文件
 * postcss 是基于 Node.js 运行的一个处理 css 的工具
 * 所以它的配置文件也是运行在 Node.js 中
 */
 module.exports = {
  //  配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀，永爱兼容不同的浏览器
    // vuecli 脚手架已经内部默认配置了 autoprefixer, 所以这里再配就是多次一举
    // autoprefixer: {
      //  browers 用来配置要兼容到的系统（浏览器）环境
      // 根目录下的.browserslistrc 文件就是用来配置要兼容的环境信息的
      // 所以在这里配置就冲突了
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },

    // 把 px 转换为 rem
    'postcss-pxtorem': {
      // 转换的根元素基准值
      // 正常情况下按照你的设计稿来
      // 750 宽的设计稿，750 / 10 = 75.0
      // 375 宽的设计稿，375 / 10 = 37.5
      // vant 组件库是基于 375 宽写的
      // 移动端页面一般都是以 iPhone 6/7/8位原型写的
      // 如果设计成 75 ，我们就可以在设计图上量多少写多少;但是vant的就变得很小
      rootValue: 37.5,

      // 配置要转换的 css 属性， * 就是所有属性都转换
      propList: ['*'],
    },
  },
};
