<template lang="pug">
BarChart(:chartData="datas")
</template>
<script>
import { defineComponent } from "vue";
import { BarChart } from "vue-chart-3";
export default defineComponent({
  name: "bar_chart",
  components: { BarChart },
  props: {
    orgData: Object,
  },
  data() {
    return {
      datas: [],
    };
  },

  methods: {
    getData() {
      this.datas = this.orgData;
    },
  },
  watch: {
    orgData: "getData",
  },
});
</script>
