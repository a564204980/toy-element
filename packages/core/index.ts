import { makeInstaller } from "@toy-element/utils";
import components from "./components";
import "@toy-element/theme/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
const installer = makeInstaller(components);

export * from "./components"; // 导出所有组件，可以按需引入
export default installer; // 导出安装器，用于Vue应用中安装所有组件
