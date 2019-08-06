## Steps 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法

简单的步骤条。

:::demo 设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Boolean`，单位为`px`，如果不设置，则为自适应。设置`finish-status`属性可以改变已经完成的步骤的状态。
```html
<el-steps :active="active">
  <el-step title="步骤 1"></el-step>
  <el-step title="步骤 2"></el-step>
  <el-step title="步骤 3"></el-step>
</el-steps>

<el-button style="margin-top: 12px;" @click="next">下一步</el-button>

<script>
  export default {
    data() {
      return {
        active: 0,
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
  }
</script>
```
:::

### alternative风格步骤条

每一步骤显示出该步骤的状态。

:::demo 也可以使用`title`具名分发，可以用`slot`的方式来取代属性的设置，在本文档最后的列表中有所有的 slot name 可供参考。
```html
<el-steps :space="200" :active="1" lineStyle="alternative">
  <el-step title="已完成">
    <span slot="tips">tips 1</span>
  </el-step>
  <el-step title="进行中" tips="tips 2"></el-step>
  <el-step title="步骤 3"></el-step>
</el-steps>
```
:::

### dot风格步骤条

每个步骤有其对应的步骤状态描述。

:::demo
```html
<el-steps :active="1" lineStyle="dot">
  <el-step title="步骤 1" description='<span style="color: red">这是一段很长很长很长的描述性文字</span>'></el-step>
  <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤 3" ></el-step>
</el-steps>
```
:::

### Steps Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| ~~space~~ | 每个 step 的间距，不填写将自适应间距。支持百分比。 | number / string | — | — |
| ~~direction~~ | 显示方向 | string | vertical/horizontal | horizontal |
| active | 设置当前激活步骤  | number | — | 0 |
| ~~process-status~~ | 设置当前步骤的状态 | string | wait / process / finish / error / success | process |
| ~~finish-status~~ | 设置结束步骤的状态 | string | wait / process / finish / error / success | finish |
| ~~align-center~~ | 进行居中对齐 | boolean | - | false |
| ~~simple~~ | 是否应用简洁风格 | boolean | - | false |

### Step Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | — | — |
| description | 富文本描述性文字 | string | — | — |

### Step Slot
| name | 说明  |
|----|----|
| ~~icon~~ | 自定义图标 |
| title | 自定义标题 |
| description | 自定义富文本描述性内容（dot风格下有效） |
| tips | tips （alternative 风格下有效） |
