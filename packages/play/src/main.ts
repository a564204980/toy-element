import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "toy-element-clone";
import "toy-element-clone/dist/index.css"; // 引入构建后的样式文件

const app = createApp(App);

app.use(ToyElement);

app.mount("#app");
