## Search 搜索

搜索组件

### 基础用法
基础搜索用法。
:::demo
```html
 <div>
   <el-search placeholder="请输入单条搜索内容" needEnterTrigger @input="input" @on-search="onSearch"></el-search>
   <br />
   <el-search multiple placeholder="请输入批量搜索内容" @input="input" @on-search="onSearch"></el-search>
 </div>
<script>
  export default {
    methods: {
      input(value) {
        alert(value);
      },
      onSearch(value){
        alert(value);
      }
    }
  }
</script>



:::

### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| value           | 默认值                   | string  | -                                             | — |
| multiple      | 是否多行                         | boolean | —                                    | false    |
| needClearIcon       | 是否需要清除图标                       | boolean | —                                    | true   |
| needEnterTrigger           | 是否需要键盘enter事件                     | boolean  | —                                    | false      |
| placeholder           | 输入框提示                       | string  | —                                    | 请输入搜索内容      |
| trim           | 是否前后去空格                       | boolean  | —                                    | false      |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| input | 输入框值变化触发 | input-value |
| on-search | 点击搜索按钮触发 | input-value |

