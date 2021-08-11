<template lang="pug">
LineChart(:chartData="datas")
</template>
<script>
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
export default defineComponent({
  name: "line_chart",
  components: { LineChart },
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
