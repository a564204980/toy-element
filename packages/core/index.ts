import printLogo from "./printLogo";
import components from "./components";
import "@toy-element-clone/theme/index.css";
import makeInstaller from "./makeInstaller";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

printLogo();

library.add(fas); // 添加所有图标
const installer = makeInstaller(components);

export * from "@toy-element-clone/components";
export * from "@toy-element-clone/locale";
export default installer;
