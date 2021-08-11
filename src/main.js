import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";

import music_card from "./components/music_card.vue";
import bar_chart from "./components/bar_chart.vue";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.component("music_card", music_card);
app.component("bar_chart", bar_chart);
app.mount("#app");
