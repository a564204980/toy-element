# Table 筛选功能与 Filter Panel 挂载方案

## 1. 功能概述

用户希望在 `Toy-Element` 的 Table 组件中实现类似 Element Plus 的列筛选功能（Filter），并重点关注筛选面板（Filter Panel）的挂载位置控制（即 `append-filter-panel-to`）。

在 Element Plus 中，筛选面板通常是一个 Popper（弹出层）。为了避免 `overflow: hidden` 或层级上下文（z-index）的问题，弹出层通常需要“传送”到 `body` 或指定的 DOM 节点。

## 2. Element Plus 的做法参考

Element Plus 的 `Table` 组件本身并没有直接名为 `append-filter-panel-to` 的 Prop。

- **默认行为**：它的筛选菜单（Popover/Tooltip）通常默认 append 到 `body`。
- **全局配置**：可以通过 `ConfigProvider` 全局配置 namespace 或者是 z-index，但通常挂载行为由内部的 `ElTooltip` / `ElPopper` 控制。`ElPopper` 有 `teleport-to` 或 `append-to` 属性。

## 3. 实现方案设计

我们将实现一个新的 Prop `append-filter-panel-to`，用于控制筛选面板的挂载目标。

### 3.1 定义 Props (types.ts)

我们需要扩展 `TableColumn` 的定义，支持筛选相关的配置。

```typescript
// packages/components/Table/types.ts

export interface TableColumn {
  // ... 现有属性

  // 筛选相关配置
  filters?: { text: string; value: string }[]; // 筛选选项
  filterMethod?: (value: any, row: any, column: TableColumn) => boolean; // 筛选方法
  filterMultiple?: boolean; // 是否多选 (默认 true)
  filterPlacement?: string; // 弹出位置 (默认 bottom-start)
  filteredValue?: string[]; // 默认选中的筛选值
}

// 扩展 Table 的 props (如果需要全局控制挂载点，可以加在这里，或者只依赖 Teleport 默认行为)
export const tableProps = {
  // ...
  // [NEW] 指定筛选面板挂载的 DOM 节点
  appendFilterPanelTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: "body", // 默认挂载到 body
  },
};
```

### 3.2 核心逻辑实现 (useFilter)

我们需要创建一个新的 Hook `useFilter` 来管理筛选状态。

1.  **状态管理**：记录哪些列处于筛选状态，以及选中的值。
2.  **数据过滤**：在 `useColumns` 或 `useSort` 之后，执行 `filterMethod` 过滤数据。

### 3.3 渲染 Filter Panel (Template)

筛选图标显示在表头 (`th`) 中。当点击图标时，显示 Filter Panel。
关键点在于 **Teleport**。

```html
<!-- TableHeader.vue 或 Table.vue 的表头部分 -->
<th v-for="column in columns" ...>
  <!-- 原有内容 -->

  <!-- [NEW] 筛选图标 -->
  <span
    v-if="column.filters"
    class="er-table__column-filter-trigger"
    @click="handleFilterClick(column)"
  >
    <er-icon icon="filter" />
  </span>

  <!-- [NEW] 筛选面板 -->
  <!-- 使用 Teleport 将面板传送到指定位置 -->
  <Teleport
    :to="tableProps.appendFilterPanelTo"
    :disabled="!tableProps.appendFilterPanelTo"
  >
    <div
      v-if="filteringColumnId === column.id"
      class="er-table-filter-panel"
      v-click-outside="closeFilter"
    >
      <!-- 渲染 checkbox 列表 -->
      <div v-for="filter in column.filters">
        <checkbox ... /> {{ filter.text }}
      </div>
    </div>
  </Teleport>
</th>
```

**定位问题**：
使用 `Teleport` 到 `body` 后，面板会脱离原有的文档流。我们需要使用 `Floating UI` (或者你现有的 Popper 逻辑) 来计算面板的绝对定位坐标 (`top`, `left`)，使其紧贴筛选图标。

如果项目中尚未集成 `Floating UI` 或 `Popper` 组件，这将是实现难点。可以暂时写一个简易的计算逻辑（获取 trigger 的 `getBoundingClientRect`）。

## 4. 样式 (SCSS)

需要添加 `.er-table-filter-panel` 的样式，通常包含：

- 绝对定位 (`position: absolute`)
- 背景色、边框、阴影
- Z-index (要足够高)

## 5. 开发步骤

1.  **修改 Types**：在 `types.ts` 中添加 `filters`, `filterMethod` 等定义。
2.  **创建 Filter Hook**：实现 `useFilter.ts`，处理筛选逻辑。
3.  **UI 实现**：
    - 在表头添加筛选图标。
    - 实现 `FilterPanel` 组件（或直接写在 template 中）。
    - 使用 `<Teleport :to="...">` 实现挂载控制。
    - 实现点击外部关闭 (`v-click-outside`)。
4.  **定位计算**：点击图标时，计算面板坐标。

---

> **关于 `append-filter-panel-to` 的特别说明**：
> 只要在 `<Teleport>` 上绑定该 Prop 即可轻松实现。
> `<Teleport :to="props.appendFilterPanelTo || 'body'" />`
