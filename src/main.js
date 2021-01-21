import Vue from 'vue'
import App from './App.vue'
import {alert} from "@/modules/alert";
import greeting, {member1, member2} from "@/modules/variables";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

alert(greeting + member1);
alert(greeting + member2);