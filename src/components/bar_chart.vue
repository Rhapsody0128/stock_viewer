<template lang="pug">
h1(@click="test()") {{this.date}}
BarChart(:chartData="composeData")
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
      date: new Date(),
    };
  },
  computed: {
    composeDate() {
      // let date =
      //   this.date.getFullYear() +
      //   "-" +
      //   parseInt(this.date.getMonth() + 1) +
      //   "-" +
      //   this.date.getDate() +
      //   " " +
      //   parseInt(this.date.getHours()) +
      //   ":00";

      let date = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate()
      );
      console.log(date.ToUniversalTime().ToString("s"));
      console.log("2021-08-11 " + 15 + ":00");
      return date;
    },
    sortData() {
      let sortData = this.datas.filter(
        (data) => data.PublishTime === "2021-08-11 " + 15 + ":00"
      );

      sortData.sort(function (a, b) {
        if (a.County < b.County) {
          return 1;
        } else {
          return -1;
        }
      });
      return sortData;
    },
    composeData() {
      let composeData = {
        labels: [],
        options: {
          indexAxis: "y",
        },
        datasets: [
          {
            label: "紫外線指數",
            data: [],
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
              "#A5C8ED",
              "#97B0C4",
              "#A5C8ED",
            ],
          },
        ],
      };
      let county = "";
      let index = 0;
      this.sortData.map((data) => {
        composeData.labels.push(data.County + data.SiteName);
        composeData.datasets[0].data.push(data.UVI);
      });
      return composeData;
    },
  },
  methods: {
    getData() {
      this.datas = this.orgData;
    },
    test() {
      console.log(this.composeDate);
    },
  },
  watch: {
    orgData: "getData",
  },
});
</script>
