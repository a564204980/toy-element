import components from "./components";
import "@toy-element/theme/index.css";
import { makeInstaller } from "@toy-element/utils";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas); // 添加所有图标
const installer = makeInstaller(components);

export default installer;
export * from "@toy-element/components";
