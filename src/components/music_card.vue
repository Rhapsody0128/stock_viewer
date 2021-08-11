<template lang="pug">
el-card.music_card(shadow="hover" :body-style="{ padding: '0px' }" @click="getInfo()")
  .image
    img(src='')
  el-descriptions.info(title='歌曲名稱' :column="1")
    template(#extra)
      h1 S
    el-descriptions-item(label='作者') sdasdads
    el-descriptions-item(label='原曲') ASD
    el-descriptions-item(label='原曲頻道') ASD
    el-descriptions-item(label='難度') SS
    el-descriptions-item(label='鍵位') 7
    el-descriptions-item(label='長度') 4:33
    el-descriptions-item(label='滿意度') 60%
    el-descriptions-item(label='遊玩數') 1560
  
</template>
<script>
export default {
  data() {
    return {
      aa: "asd",
    };
  },
  methods: {
    getInfo() {
      console.log(this.axios);
      this.axios.get("asd").then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.music_card
  height 25rem
  padding 0.1rem
  overflow hidden
  .image
    height 18rem
    width 100%
    transition 0.5s
    img
      height 100%
      width 100%
      object-fit cover
  .info
    height 100%
    padding 0.5rem
.music_card:hover
  .image
    height 0
    opacity 0
</style>
