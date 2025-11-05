# Icon 组件测试用例说明

## 测试文件位置
`packages/components/Icon/Icon.test.tsx`

## 测试覆盖范围

### 1. 基础功能测试
- ✅ 基础图标渲染
- ✅ FontAwesome组件集成

### 2. 样式与主题测试
- ✅ 图标类型测试 (primary, success, warning, danger, info)
- ✅ 自定义颜色设置
- ✅ CSS类名正确应用

### 3. 尺寸测试
- ✅ 支持的所有尺寸规格 (xs, sm, lg, xl, 2x, 3x等)
- ✅ 尺寸属性正确传递

### 4. 动画效果测试
- ✅ 旋转动画 (spin)
- ✅ 脉冲动画 (pulse)
- ✅ 弹跳动画 (bounce)
- ✅ 抖动动画 (shake)
- ✅ 心跳动画 (beat)
- ✅ 淡入淡出动画 (fade)
- ✅ 组合动画效果

### 5. 变形与旋转测试
- ✅ 图标旋转 (90°, 180°, 270°)
- ✅ 图标翻转 (horizontal, vertical, both)
- ✅ 自定义变形对象

### 6. 布局属性测试
- ✅ 边框显示 (border)
- ✅ 固定宽度 (fixedWidth)
- ✅ 浮动方向 (pull)
- ✅ 列表项模式 (listItem)

### 7. 高级功能测试
- ✅ 图标遮罩功能 (mask)
- ✅ 符号模式 (symbol)
- ✅ 反转颜色 (inverse)
- ✅ 图标标题 (title)
- ✅ 图标定义对象支持

### 8. 属性传递测试
- ✅ 属性过滤机制 (type, color不传递给FontAwesome)
- ✅ 自定义HTML属性传递
- ✅ Vue属性绑定

### 9. 边界情况测试
- ✅ 空图标处理
- ✅ 无效属性处理

## 如何运行测试

### 运行所有组件测试
```bash
# 在项目根目录执行
pnpm test
```

### 只运行Icon组件测试
```bash
# 进入components目录
cd packages/components

# 运行特定测试文件
pnpm vitest Icon/Icon.test.tsx
```

### 运行测试并查看覆盖率
```bash
# 在components目录执行
pnpm test --coverage
```

### 监听模式运行测试
```bash
# 在components目录执行
pnpm vitest Icon/Icon.test.tsx --watch
```

## 测试用例特点

### 1. 全面性
- 覆盖了Icon组件的所有主要功能
- 包含正常情况和边界情况
- 测试了所有公开的props属性

### 2. 可维护性
- 使用参数化测试 (`it.each`) 减少重复代码
- 清晰的测试描述和分组
- 易于扩展新的测试用例

### 3. 可靠性
- 使用Vue Test Utils进行组件测试
- 模拟真实的组件使用场景
- 验证组件的输入输出行为

### 4. 性能友好
- 每个测试用例独立运行
- 使用合适的断言方法
- 避免不必要的DOM操作

## 测试结果示例

运行测试后，你应该看到类似以下的输出：

```
✓ Icon.vue (25)
  ✓ 应该正确渲染基础图标
  ✓ 当设置type为primary时，应该具有正确的类名
  ✓ 当设置type为success时，应该具有正确的类名
  ✓ 当设置type为warning时，应该具有正确的类名
  ✓ 当设置type为danger时，应该具有正确的类名
  ✓ 当设置type为info时，应该具有正确的类名
  ✓ 当设置color属性时，应该应用自定义颜色样式
  ✓ 当设置size为xs时，应该正确传递给FontAwesome组件
  ✓ 当设置size为sm时，应该正确传递给FontAwesome组件
  ✓ 当设置size为lg时，应该正确传递给FontAwesome组件
  ✓ 当设置size为xl时，应该正确传递给FontAwesome组件
  ✓ 当设置size为2x时，应该正确传递给FontAwesome组件
  ✓ 当设置size为3x时，应该正确传递给FontAwesome组件
  ✓ 当设置spin动画属性时，应该正确传递给FontAwesome组件
  ✓ 当设置pulse动画属性时，应该正确传递给FontAwesome组件
  ✓ 当设置bounce动画属性时，应该正确传递给FontAwesome组件
  ✓ 当设置shake动画属性时，应该正确传递给FontAwesome组件
  ✓ 当设置beat动画属性时，应该正确传递给FontAwesome组件
  ✓ 当设置fade动画属性时，应该正确传递给FontAwesome组件
  ✓ 当设置rotation为90时，应该正确传递给FontAwesome组件
  ✓ 当设置rotation为180时，应该正确传递给FontAwesome组件
  ✓ 当设置rotation为270时，应该正确传递给FontAwesome组件
  ✓ 当设置rotation为90时，应该正确传递给FontAwesome组件
  ✓ 当设置flip为horizontal时，应该正确传递给FontAwesome组件
  ✓ 当设置flip为vertical时，应该正确传递给FontAwesome组件
  ✓ 当设置flip为both时，应该正确传递给FontAwesome组件
  ✓ 当设置布局相关属性时，应该正确传递给FontAwesome组件
  ✓ 应该正确过滤掉type和color属性，不传递给FontAwesome组件
  ✓ 应该正确传递自定义HTML属性
  ✓ 应该支持传入图标定义对象
  ✓ 应该支持图标遮罩功能
  ✓ 应该支持图标变形功能
  ✓ 应该支持符号模式
  ✓ 应该支持反转图标颜色
  ✓ 应该支持设置图标标题
  ✓ 应该支持组合动画效果
  ✓ 当没有传入icon属性时，组件应该正常渲染

Test Files  1 passed (1)
Tests  25 passed (25)
```

## 注意事项

1. **依赖要求**: 确保已安装 `@vue/test-utils` 和 `vitest`
2. **FontAwesome**: 测试依赖FontAwesome图标库的正确配置
3. **测试环境**: 需要在支持Vue 3的测试环境中运行
4. **覆盖率**: 建议运行覆盖率测试确保测试完整性

这个测试用例为Icon组件提供了全面的测试覆盖，确保组件在各种使用场景下都能正常工作。