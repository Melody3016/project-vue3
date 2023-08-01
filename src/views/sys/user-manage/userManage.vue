<template>
  <div class="containers">
    <!-- 搜索输入框区 -->
    <div class="searchBox">
      <a-form>
        <!-- 非折叠部分 -->
        <a-form-item label="用户名" v-bind="validateInfos.name">
          <a-input v-model:value="modelRef.name" />
        </a-form-item>
        <a-form-item label="部门" v-bind="validateInfos.department">
          <a-cascader
            v-model:value="value"
            :options="options"
            placeholder="Please select"
          />
        </a-form-item>

        <a-collapse v-model:activeKey="activeKey" ghost>
          <a-collapse-panel key="1" header="This is panel header 1">
            <p>内容</p>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
    <!-- 表格按钮操作区 -->

    <!-- 表格区 -->
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from "vue"
import { Form } from "ant-design-vue"
import type { CascaderProps } from "ant-design-vue"

const useForm = Form.useForm

const activeKey = ref(["1"])
const value = ref<string[]>([])
const options: CascaderProps["options"] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
]
const modelRef = reactive({
  name: "",
  region: undefined,
  type: []
})
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: "Please input name"
    }
  ],
  region: [
    {
      required: true,
      message: "Please select region"
    }
  ],
  type: [
    {
      required: true,
      message: "Please select type",
      type: "array"
    }
  ]
})
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args)
})
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef))
    })
    .catch((err) => {
      console.log("error", err)
    })
}
</script>
<style lang="scss" scoped></style>
