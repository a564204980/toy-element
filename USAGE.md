# Toy Element 使用指南

## 打包后的 dist 文件用途

当你运行 `pnpm build-es` 和 `pnpm build-umd` 后，会在 `packages/core/dist/` 目录下生成两种格式的文件：

### 1. ES 模块格式 (`dist/es/`)

- **目标用户**: 使用现代构建工具的开发者（如 Vite、Webpack、Rollup）
- **文件结构**:
  ```
  dist/es/
  ├── index.js          # 主入口文件
  ├── index.css         # 样式文件
  ├── utils-xxx.js      # 工具函数模块
  ├── vendor-xxx.js     # 第三方依赖
  └── hooks-xxx.js      # hooks 模块
  ```

#### 使用方式：

```javascript
// 在 Vue 3 项目中使用
import { createApp } from "vue";
import ToyElement from "toy-element/dist/es/index.js";
import "toy-element/dist/es/index.css";

const app = createApp(App);
app.use(ToyElement);
```

### 2. UMD 格式 (`dist/umd/`)

- **目标用户**: 直接在浏览器中使用，或不使用构建工具的项目
- **文件结构**:
  ```
  dist/umd/
  ├── index.umd.cjs     # UMD 格式的主文件
  └── index.css         # 样式文件
  ```

#### 使用方式：

```html
<!-- 直接在 HTML 中使用 -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="./dist/umd/index.css" />
  </head>
  <body>
    <div id="app"></div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="./dist/umd/index.umd.cjs"></script>
    <script>
      const { createApp } = Vue;
      const app = createApp({
        template: "<toy-button>Hello</toy-button>",
      });
      app.use(ToyElement);
      app.mount("#app");
    </script>
  </body>
</html>
```

### 3. TypeScript 类型定义 (`dist/types/`)

- **目标用户**: TypeScript 项目开发者
- **内容**: 包含所有组件和工具的类型定义文件

## 发布到 NPM

这些 dist 文件通常会被发布到 NPM 包管理器，供其他开发者安装使用：

```bash
# 其他开发者可以这样安装
npm install toy-element
# 或
pnpm add toy-element
```

## 使用场景

1. **组件库开发者**: 你（打包这些文件）
2. **应用开发者**: 使用你的组件库的其他开发者
3. **CDN 服务**: 可以将 UMD 文件托管到 CDN 供直接引用

## package.json 配置

为了让其他人能正确使用你的包，需要在 `package.json` 中配置入口文件：

```json
{
  "name": "toy-element",
  "main": "dist/umd/index.umd.cjs",
  "module": "dist/es/index.js",
  "types": "dist/types/index.d.ts",
  "files": ["dist"]
}
```
