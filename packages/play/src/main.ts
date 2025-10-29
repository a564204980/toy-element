import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "toy-element-cli-clone";
import "toy-element-cli-clone/dist/index.css";

const app = createApp(App);
app.use(ToyElement);
app.mount("#app");
