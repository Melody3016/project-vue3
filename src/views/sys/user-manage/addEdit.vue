<template>
  <!-- 预览 编辑 新增三种模式分别为 0 1 2 -->
  <a-drawer
    :title="title"
    :width="720"
    :visible="visible"
    :maskClosable="maskClosable"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form layout="vertical">
      <div style="margin-bottom: 16px; font-size: 16px">基本信息</div>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="登录账号" name="username">
            <a-input
              v-model:value="modelRef.username"
              placeholder="请输入登录账号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="密码" name="password">
            <a-input-password
              v-model:value="modelRef.password"
              placeholder="请输入密码，长度为6-20个字符"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="用户名" name="nickname">
            <a-input
              v-model:value="modelRef.nickname"
              placeholder="请输入登录账号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="邮箱" name="email">
            <a-input v-model:value="modelRef.email" placeholder="请输入邮箱" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="手机号" name="mobile">
            <a-input
              v-model:value="modelRef.mobile"
              placeholder="请输入手机号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="性别" name="sex">
            <a-select v-model:value="modelRef.sex" placeholder="请选择性别">
              <a-select-option value="男">男</a-select-option>
              <a-select-option value="女">女</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所属部门" name="department">
            <a-input
              v-model:value="modelRef.department"
              placeholder="请输入手机号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用户类型" name="type">
            <a-select
              v-model:value="modelRef.type"
              placeholder="请选择用户类型"
            >
              <a-select-option :value="0">普通用户</a-select-option>
              <a-select-option :value="1">管理员</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="头像" name="avatar">
            <a-input v-model:value="modelRef.avatar" placeholder="请输入头像" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="角色分配" name="roleIds">
            <a-select v-model:value="modelRef.roleIds" placeholder="请选择">
              <a-select-option :value="0">普通用户</a-select-option>
              <a-select-option :value="1">管理员</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider />
      <div style="margin-bottom: 16px; font-size: 16px">个人资料</div>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所在地区" name="address">
            <a-input
              v-model:value="modelRef.address"
              placeholder="请选择地区"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="街道地址" name="street">
            <a-input v-model:value="modelRef.street" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="生日" name="birth">
            <a-date-picker v-model:value="modelRef.birth" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="简介" name="description">
            <a-textarea v-model:value="modelRef.description" :rows="4" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer v-if="type !== 0">
      <a-space>
        <a-button type="primary" @click="onClose">提交</a-button>
        <a-button @click="onClose">取消</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from "vue"
import { Form } from "ant-design-vue"

const props = defineProps<{
  visible: boolean
  // 0 1 2 分别代表 预览 编辑 新增
  type: number
}>()
const emits = defineEmits<{
  (e: "update:visible", value: boolean): void
}>()
// 标题
const title = ref("")
title.value =
  props.type === 0 ? "用户详情" : props.type === 1 ? "编辑用户" : "新增用户"
// 点击蒙层是否允许关闭
const maskClosable = ref(false)
maskClosable.value = props.type === 0 ? true : false

// 表单数据
const useForm = Form.useForm
const modelRef = reactive({
  username: "",
  password: "",
  nickname: "",
  email: "",
  mobile: "",
  sex: "",
  department: "",
  type: "",
  avatar: "",
  roleIds: "",
  address: "",
  street: "",
  birth: "",
  description: ""
})
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: "Please input Activity name"
    },
    {
      min: 3,
      max: 5,
      message: "Length should be 3 to 5",
      trigger: "blur"
    }
  ],
  region: [
    {
      required: true,
      message: "Please select region"
    }
  ]
})
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef)
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef))
    })
    .catch((err) => {
      console.log("error", err)
    })
}
const onClose = () => {
  emits("update:visible", false)
  // visible.value = false
}
</script>
<style lang="scss" scoped></style>
