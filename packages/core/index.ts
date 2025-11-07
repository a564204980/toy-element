import printLogo from "./printLogo";
import components from "./components";
import "@toy-element/theme/index.css";
import { makeInstaller } from "@toy-element/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
const installer = makeInstaller(components);

printLogo();

export * from "@toy-element/components"; // 导出所有组件，可以按需引入
// 这里引入组件不能用上面那种写法，因为最终通过build构建的产物dist的types里面core包是需要指向相对路径的components的
// export * from "../components";
export default installer; // 导出安装器，用于Vue应用中安装所有组件
