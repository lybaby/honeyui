## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `tea-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="tea-icon tea-icon-pencil"></i>
<i class="tea-icon tea-icon-wechat"></i>
<i class="tea-icon tea-icon-delete"></i>
<el-button type="icon" icon="search">搜索</el-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'tea-icon-' + name" class="tea-icon"></i>
      <span class="icon-name">{{'tea-icon-' + name}}</span>
    </span>
  </li>
</ul>
