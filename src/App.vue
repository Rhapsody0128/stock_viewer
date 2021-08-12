<template lang="pug">
#App
  #Nav
    el-menu.el-menu-demo(mode='horizontal' router=true)
      el-menu-item(index='/') Home
      el-menu-item(index='Bar') Bar
      el-menu-item(index='Line') Line
      el-menu-item(index='Table') Table
  router-view
</template>
<style lang="stylus">
*,html
  margin 0
  padding 0
  font-family 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
#App
  position relative
  text-align center
#Nav
  position fixed
  top 0
  z-index 2
  width 100%
  opacity 0.2
  transition 0.5s
  &:hover
    opacity 1

::-webkit-scrollbar
  display:none;
</style>
