import App from './App';
import Vue from 'vue';
import uView from "uview-ui";
import request from '@/config/request';

Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});

request(app);

app.$mount();