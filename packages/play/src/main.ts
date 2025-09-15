import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "toy-element-clone"; // 引入打包后的库
// import "toy-element-clone/dist/theme/Button.css"; // 可以按需引入样式
// import ToyElement from "../../core/index";
import "toy-element-clone/dist/index.css"; // 引入构建后的样式文件

const app = createApp(App);

app.use(ToyElement);

app.mount("#app");
