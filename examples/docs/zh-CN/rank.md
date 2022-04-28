## Rank 层级组件

层级组件

### 基础用法

:::demo 通过 `selectedItem` 属性值传入初始值， `tablist` 传入 tab 对应数据，`data` 传入当前 tab 中具体数据

```html
<el-rank :selected-item="selectedItem" :data="data" :tablist="tablist" :selected-tab="selectedTab"></el-rank>

<script>
  export default {
    data() {
      return {
        selectedItem: [
          {
            label: '桑德瑞拉',
            id: '321321312'
          },
          {
            label: '巴黎',
            id: '9748931'
          },
          {
            label: '莫斯科',
            id: 'ed5351213'
          }
        ],
        selectedTab: '1',
        tablist: [
          {
            label: '示例1',
            name: '1'
          },
          {
            label: '示例2',
            name: '2'
          },
          {
            label: '示例3',
            name: '3'
          }
        ],
        data: [
          {
            label: '巴黎',
            id: '9748931'
          },
          {
            label: '莫斯科',
            id: 'ed5351213'
          },
          {
            label: '桑德瑞拉',
            id: '321321312'
          },
          {
            label: '巴黎2',
            id: '97489321'
          },
          {
            label: '莫斯科2',
            id: 'ed53512132'
          },
          {
            label: '桑德瑞拉2',
            id: '3213213122'
          },
          {
            label: '巴黎3',
            id: '97489313'
          },
          {
            label: '莫斯科3',
            id: 'ed53512133'
          },
          {
            label: '桑德瑞拉3桑德瑞拉3桑德瑞拉3桑德瑞拉3桑德瑞拉3桑德瑞拉3桑德瑞拉3桑德瑞拉3桑德瑞拉3桑德瑞拉3',
            id: '3213213123'
          },
          {
            label: '巴黎',
            id: '974855931'
          },
          {
            label: '莫斯科',
            id: 'ed535551213'
          },
          {
            label: '桑德瑞拉',
            id: '32135521312'
          },
          {
            label: '巴黎2',
            id: '9745589321'
          },
          {
            label: '莫斯科2',
            id: 'ed5355512132'
          },
          {
            label: '桑德瑞拉2',
            id: '321355213122'
          },
          {
            label: '巴黎3',
            id: '9745589313'
          },
          {
            label: '莫斯科3',
            id: 'ed5355512133'
          },
          {
            label: '桑德瑞拉3桑德瑞拉3',
            id: '55'
          }
        ]
      };
    }
  };
</script>
```

:::

### 面板加载状态

:::demo 通过 `panel-loading` 属性指定

```html
<el-rank :value="value" :panel-loading="true"></el-rank>

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

### 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 rank 组件，此时仅通过 `value` 属性即可指定初始值。

```html
<el-rank disabled :value="value"></el-rank>

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
| panel-loading | 面板是否加载中                                    | boolean       | —          | false  |

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
