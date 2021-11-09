## Popper 弹出菜单

支持自定义显示内容的弹出菜单组件

### 基础用法

:::demo 111

```html
<template>
  <el-popper :border="true">
    <div slot="popper">我是slot1</div>
  </el-popper>

  <el-popper :border="true" :enable-arrow="false">
    <div slot="popper">我是slot2</div>
  </el-popper>
</template>
```

:::

### 自定义显示内容

:::demo 111

```html
<template>
  <el-popper :border="true">
    <div slot="popper">我是slot3</div>
    <template slot="value">
      <div>自定义Value内容</div>
      <div>自定义Value内容</div>
      <div>自定义Value内容</div>
      <div>自定义Value内容</div>
      <div>自定义Value内容</div>
    </template>
  </el-popper>
</template>
```

:::

### 禁用状态

:::demo 222

```html
<el-popper disabled />

<script>
  export default {
    data() {
      return {
        value: '桑德瑞拉/巴黎/莫斯科'
      };
    }
  };
</script>
```

:::

### Attributes

| 参数          | 说明                                              | 类型          | 可选值     | 默认值 |
| ------------- | ------------------------------------------------- | ------------- | ---------- | ------ |
| value         | 默认初始值                                        | string/number | —          | ' '    |
| disabled      | 是否禁用操作                                      | boolean       | true/false | false  |
| item-class    | 选项样式 class                                    | object        | —          | —      |
| tooltip       | 选项的排列定宽，多出部分...显示，移入显示 tooltip | boolean       | true/false | true   |
| tablist       | tab 数据，必传                                    | array         | —          | [ ]    |
| selected-tab  | 默认选中的 tab 项                                 | string/number | —          |        |
| data          | 当前选中的 tab 下选项数据                         | array         | —          | [ ]    |
| selected-item | 已选中的具体数据                                  | array         | —          | [ ]    |

### props

| 参数     | 说明                                        | 类型   | 可选值 | 默认值 |
| -------- | ------------------------------------------- | ------ | ------ | ------ |
| label    | 指定当前选项数据格式中显示内容的某个属性值  | string | —      | label  |
| idName   | 指定当前选项数据格式中唯一标识的某个属性值  | string | —      | id     |
| tabLabel | 指定当前 tab 数据格式中显示内容的某个属性值 | string | —      | label  |
| tabName  | 指定当前 tab 数据格式中唯一标识的某个属性值 | string | —      | name   |

### Events

| 事件名称          | 说明                 | 回调参数                     |
| ----------------- | -------------------- | ---------------------------- |
| handle-click      | 点击输入框时触发     | —                            |
| change            | 选中值改变时触发     | 当前选中值，当前选中值的数组 |
| click-tab         | 点击 tab 时触发      | 当前选中 tab 项              |
| click-item        | 点击具体数据项时触发 | 当前数据项，当前项索引       |
| handle-panel-hide | 选项面板关闭时触发   | —                            |
