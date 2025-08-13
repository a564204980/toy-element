import components from "./components";
import "@toy-element/theme/index.css";
import { makeInstaller } from "@toy-element/utils";

const installer = makeInstaller(components);

export default installer;
export * from "@toy-element/components";
