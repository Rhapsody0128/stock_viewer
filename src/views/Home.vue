<template lang="pug">
#Home
  el-header
  el-main
    h1 台灣紫外線指數 {{getSiteName}}
    el-row(type="flex" justify="center")
      el-col(:sm='24')
        h3 請選擇觀測站
        el-select(v-model='SiteName' placeholder='請選擇觀測站')
          el-option-group(v-for='group in options' :key='group.label' :label='group.label')
            el-option(v-for='item in group.options' :key='item.value' :label='item.label' :value='item.value')
    el-row(type="flex" justify="center")
      el-col(:lg='10' :md='14' :sm='18' :xs='24')
        el-carousel(:interval='3000' indicator-position="outside" height='90vh' :pauseOnHover="true")
          el-carousel-item.item
            h2 Bar Chart
            bar_chart(:orgData='barData')
          el-carousel-item.item
            h2 Line Chart
            line_chart(:orgData='lineData')
          el-carousel-item.item
            h2 Table
            el-table(:data='tableData' style='width: 100%' max-height="580")
              el-table-column(prop='PublishTime' label='時間' sortable='' width='150')
              el-table-column(prop='UVI' label='UVI指數' sortable='' width='150')
              el-table-column(prop='SiteName' label='站點' sortable='' width='150')
              el-table-column(prop='County' label='縣市' sortable='' width='150')
              el-table-column(prop='PublishAgency' label='資訊來源' sortable='' width='150')

</template>
<script setup></script>

<script>
export default {
  data() {
    return {
      datas: [],
      SiteName: "",
      options: [],
      dialogVisible: false,
    };
  },
  computed: {
    getSiteName() {
      this.SiteName = this.$store.getters.getSiteName;
      return this.$store.getters.getSiteName;
    },
    getOptions() {
      let options = [];
      let option = {};
      let PublishTime = this.sortDatabyTime[0].PublishTime;
      let lastCounty = "";
      console.log(this.sortData);
      this.sortData.map((data) => {
        if (data.PublishTime !== PublishTime) {
          return;
        }
        if (data.County === lastCounty) {
          option.options.push({
            value: data.SiteName,
          });
        } else {
          options.push(option);
          option = {
            label: data.County,
            options: [
              {
                value: data.SiteName,
              },
            ],
          };
        }
        lastCounty = data.County;
      });
      options.shift();
      return options;
    },
    sortData() {
      let sortData = this.datas.sort(function (a, b) {
        if (a.County < b.County) {
          return 1;
        } else {
          return -1;
        }
      });
      return sortData;
    },
    sortDatabyTime() {
      let sortData = this.datas.sort(function (a, b) {
        if (a.PublishTime < b.PublishTime) {
          return 1;
        } else {
          return -1;
        }
      });
      return sortData;
    },
    selectData() {
      let selectData = this.sortData.filter(
        (data) => data.SiteName === this.SiteName
      );
      return selectData;
    },
    barData() {
      let barData = {
        labels: [],
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
      this.selectData.map((data) => {
        barData.labels.push(this.dateToString(data.PublishTime));
        barData.datasets[0].data.push(data.UVI);
      });
      return barData;
    },
    lineData() {
      let barData = {
        labels: [],
        datasets: [
          {
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            label: "紫外線指數",
            data: [],
          },
        ],
      };
      let county = "";
      let index = 0;
      this.selectData.map((data) => {
        barData.labels.push(this.dateToString(data.PublishTime));
        barData.datasets[0].data.push(data.UVI);
      });
      return barData;
    },
    tableData() {
      let tableData = [];
      this.selectData.map((data) => {
        let perData = {
          County: data.County,
          PublishAgency: data.PublishAgency,
          PublishTime: this.dateToString(data.PublishTime),
          SiteName: data.SiteName,
          UVI: data.UVI,
        };
        tableData.push(perData);
      });
      return tableData;
    },
  },
  methods: {
    dateToString(date) {
      let stringArray = [];
      stringArray = date.split("-");
      stringArray = stringArray[2].split(" ");
      stringArray = stringArray[0] + "號 " + stringArray[1];
      return stringArray;
    },
    commitSiteName() {
      this.$store.commit("selectSite", this.SiteName);
    },
  },
  mounted() {
    try {
      this.axios
        .get(
          "https://data.epa.gov.tw/api/v1/uv_s_01?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&sort=ImportDate%20desc&format=json"
        )
        .then((response) => {
          this.datas = response.data.records;
          this.options = this.getOptions;
        });
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    SiteName: "commitSiteName",
  },
};
</script>
<style lang="stylus" scoped>
.item
  background rgba(255,255,255,0.95)
</style>
