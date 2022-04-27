## SelectTree 树形选择器

树形选择器

### 基础用法

:::demo demo 说明

```html
<el-select-tree
  filterable
  placeholder="请选择行政区划范围"
  select-all-text="全部街道和小区"
  tree-node-key="id"
  v-model="select"
  :tree-data="treeData"
  :tree-props="treeProps"
  :filter-tag-method="filterTag"
  @node-select-change="val => this.selectedNode = val"
/>

<script>
  export default {
    data() {
      return {
        select: [],
        selectedNode: [],
        treeProps: {
          defaultExpandedKeys: ['system-select-all']
        },
        treeData: [
          {
            label: '全选',
            id: 'system-select-all',
            children: [
              {
                label: 'A街道',
                id: 'd|123131213311',
                children: [
                  {
                    label: 'A社区',
                    id: 'd|123131231311',
                    children: [{ label: '小区1', id: '231123Z231312' }, { label: '小区2', id: '2312Z231312' }]
                  },
                  {
                    label: 'B街道',
                    id: 'd|1235311',
                    children: [
                      { label: 'B社区1', id: '23155123Z231667312' },
                      { label: 'B社区2', id: '23155123Z268631312' },
                      { label: 'B社区3', id: '23155123Z662931312' },
                      { label: 'B社区4', id: '2315512663Z231312' }
                    ]
                  }
                ]
              },
              {
                label: 'B社区',
                id: 'd|87293817231',
                children: [{ label: '小区1231', id: '9321713' }, { label: '小区120.31', id: '9322131713' }]
              }
            ]
          }
        ]
      };
    },
    computed: {
      hideNodeMap() {
        const map = {};
        const findChildNode = (arr) => {
          arr.forEach((node) => {
            if (node.children) {
              node.children.forEach((child) => {
                map[child.id] = child;
                if (child.children) {
                  findChildNode(child.children);
                }
              });
            }
          });
        };
        findChildNode(this.selectedNode);
        return map;
      }
    },
    methods: {
      filterTag(tag) {
        return tag.id !== 'system-select-all' && !this.hideNodeMap[tag.id];
      }
    }
  };
</script>
```

:::

### 数据加载 Mask

:::demo 对于大范围的数据，可通过 `isLoading` 字段给选择器加上蒙层，以防数据冲突

```html
<el-select-tree :is-loading="true" />
```

:::

### 虚拟列表

:::demo 说明

```html
<el-select-tree :tree-data="treeData" :tree-props="vTreeProps" />
<script>
  const genChild = (prefix = '') => {
    const childArr = [];
    for (let i = 1; i < 100; i++) {
      childArr.push({ label: `${prefix}社区${i}`, id: `key${prefix}${i}` });
    }
    return childArr;
  };
  export default {
    data() {
      return {
        vTreeProps: { virtual: true, 'virtual-list-style': { 'max-height': '200px' } },
        treeData: [
          {
            label: '全选',
            id: 'system-select-all',
            children: [
              {
                label: 'A街道',
                id: 'd|87293817231',
                children: genChild(1)
              },
              {
                label: 'B街道',
                id: 'd|87293817212331',
                children: genChild('B')
              }
            ]
          }
        ]
      };
    }
  };
</script>
```

:::

### Attributes

| 参数               | 说明                                                     | 类型                            | 可选值 | 默认值         |
| ------------------ | -------------------------------------------------------- | ------------------------------- | ------ | -------------- |
| value / v-model    | 绑定值，由 nodeId 组成的数组                             | array                           | —      | []             |
| is-loading         | 是否加载状态，会在下拉框显示蒙层                         | boolean                         | —      | false          |
| placeholder        | 默认值                                                   | string                          | —      | '请选择'       |
| filterable         | 是否支持搜索（默认使用 label 匹配）                      | boolean                         | —      | false          |
| search-placeholder | 搜索框默认值                                             | string                          | —      | '请输入关键字' |
| select-all-text    | 指定后，全选状态下将会显示改文字提示                     | string                          | —      | —              |
| tree-data          | 树内容                                                   | array<{label:string;id:string}> | —      | —              |
| tree-node-key      | 树 ID，默认为'id'                                        | string                          | —      | 'id'           |
| tree-props         | 树透传属性，可用来开启虚拟列表等功能                     | object                          | —      | —              |
| filter-tag-method  | 用来筛选标签的显示，参数为 node，返回 false 则标签不显示 | function(node):boolean          | —      | —              |
| popper-class       | 透传 popper 的 class                                     | object                          | —      | —              |

### Events

| 事件名称           | 说明              | 回调参数 |
| ------------------ | ----------------- | -------- |
| node-select-change | Node 选择事件回调 | (node[]) |
