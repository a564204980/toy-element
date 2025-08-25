import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "toy-element";
import "toy-element/dist/index.css"; // 引入构建后的样式文件

const app = createApp(App);

app.use(ToyElement);

app.mount("#app");
