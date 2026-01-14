<script lang="ts">
import { provide, ref, defineComponent, h, Fragment } from "vue";
import { tableColumnProps, type TableColumn } from "./types";
import { inject, onMounted, getCurrentInstance, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "ErTableColumn",
  props: tableColumnProps,
  setup(props, { slots }) {

    // 注入父组件提供的注册方法
    const table = inject<any>("ErTable");
    // 如果有嵌套层就可以获取到父列
    const parentColumn = inject<any>("ErTableColumn", null);

    const childColumns = ref<TableColumn[]>([]); // 存储子列配置

    // 获取组件实例ID
    const instance = getCurrentInstance();
    let columnIndex: number | null = null;

    /**
     * 注册子列
     * @param column - 子列配置
     * @returns 返回子列在数组中的索引
     */
    const registerChildColumn = (column: TableColumn) => {
      childColumns.value.push(column);
      return childColumns.value.length - 1;
    };

    /**
     * 注销子列
     * @param index - 子列在数组中的索引
     */
    const unregisterChildColumn = (index: number) => {
      if (index >= 0 && index < childColumns.value.length) {
        childColumns.value.splice(index, 1);
      }
    };

    // 父列就开始执行注册子列
    provide("ErTableColumn", {
      registerColumn: registerChildColumn,
      unregisterColumn: unregisterChildColumn,
      props: props,
    });

    onMounted(() => {
      // 构建当前列的完整配置数据
      const columnData: TableColumn = {
        id: instance?.uid.toString() || Math.random().toString(),
        prop: props.prop,
        label: props.label,
        width: props.width,
        minWidth: props.minWidth,
        align: props.align,
        // 子列的 fixed 继承父列：如果子列没设置 fixed，则使用父列的 fixed
        fixed: props.fixed || (parentColumn?.props?.fixed),
        children: childColumns.value.length > 0 ? childColumns.value : undefined,
        level: parentColumn ? (parentColumn.level ?? 0) + 1 : 0, // 计算当前层级
        type: props.type,
        index: props.index,
        selectable: props.selectable,
        reserveSelection: props.reserveSelection,
        sortable: props.sortable,
        sortOrders: props.sortOrders,
        renderCell: slots.default
      };


      // 是嵌套列
      if (parentColumn && parentColumn.registerColumn) {
        // 注册到父列的children
        columnIndex = parentColumn.registerColumn(columnData);
      } else if (table && table.registerColumn) {
        // 不是嵌套列直接注册到table下的columns里边
        columnIndex = table.registerColumn(columnData);
      }
    });

    // 组件卸载时注销列
    onBeforeUnmount(() => {
      if (parentColumn && parentColumn.unregisterColumn && columnIndex !== null) {
        parentColumn.unregisterColumn(columnIndex);
      } else if (table && table.unregisterColumn && columnIndex !== null) {
        table.unregisterColumn(columnIndex);
      }
    });

    return {}
  },

  render() {
    /**
     * 原本通过slot的方式不行，因为vue会自动调用插槽函数并渲染内容，
     * 但是这里需要获取插槽函数返回的VNode数组，
     * 所以需要手动调用插槽函数，这样就可以过滤掉undefined的数据，变成可控
    */
    const defaultSlot = this.$slots.default?.({
      row: {},
      column: {},
      $index: -1
    })

    if (!defaultSlot) return null;

    const children: any[] = []

    console.log("defaultSlot", defaultSlot)

    defaultSlot.forEach((node: any) => {
      if (node.type?.name === "ErTableColumn") {
        children.push(node)
      }
    })

    return h("div", { style: { display: "none" } }, children)
  }
})


</script>
