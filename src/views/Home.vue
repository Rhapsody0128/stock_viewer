<template lang="pug">
#Home
  el-header
  el-main
    el-row(type="flex" justify="center")
      el-col(:span='12')
        bar_chart(:orgData='orgData')
</template>
<script setup></script>

<script>
export default {
  data() {
    return {
      orgData: [],
    };
  },
  mounted() {
    var data = [];
    try {
      this.axios
        .get(
          "https://data.epa.gov.tw/api/v1/uv_s_01?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&sort=ImportDate%20desc&format=json"
        )
        .then((response) => {
          data = response.data.records;
          this.orgData = data;
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style lang="stylus" scoped></style>
