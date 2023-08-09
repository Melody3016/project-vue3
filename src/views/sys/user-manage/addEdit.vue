<template>
  <!-- 预览 编辑 新增三种模式分别为 0 1 2 -->
  <a-drawer
    :title="title"
    :width="720"
    :visible="visible"
    :maskClosable="maskClosable"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'left', marginLeft: '8px' }"
    @close="onClose"
  >
    <a-form layout="vertical">
      <div style="margin-bottom: 16px; font-size: 16px">基本信息</div>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            label="登录账号"
            name="username"
            v-bind="validateInfos.username"
          >
            <a-input
              v-model:value="modelRef.username"
              placeholder="请输入登录账号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="密码"
            name="password"
            v-bind="validateInfos.password"
          >
            <a-input-password
              v-model:value="modelRef.password"
              placeholder="请输入密码，长度为6-20个字符"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            label="用户名"
            name="nickname"
            v-bind="validateInfos.nickname"
          >
            <a-input
              v-model:value="modelRef.nickname"
              placeholder="请输入登录账号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="邮箱" name="email" v-bind="validateInfos.email">
            <a-input v-model:value="modelRef.email" placeholder="请输入邮箱" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            label="手机号"
            name="mobile"
            v-bind="validateInfos.mobile"
          >
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
        <a-col :span="12" class="dep">
          <a-form-item label="所属部门" name="department" style="width: 200px">
            <a-input
              v-model:value="modelRef.department"
              readonly
              placeholder="点击选择部门"
            />
          </a-form-item>
          <a-popover
            title="选择部门"
            trigger="click"
            placement="right"
            :visible="clicked"
            @visibleChange="handleClickChange"
          >
            <a-button @click="clicked = true" style="margin-top: 5px">
              <template #icon><align-left-outlined /></template
              >选择部门</a-button
            >
            <template #content>
              <a-input-search
                v-model:value="searchKey"
                @search="searchDep"
                placeholder="输入部门名搜索"
                clearable
              />
              <div class="dep-tree-bar">
                <a-tree
                  v-model:selectedKeys="selectedKeys"
                  :load-data="loadTreeData"
                  :tree-data="treeData"
                  @select="handleSelect"
                >
                  <template #title="{ title }">
                    <span v-if="title.indexOf(searchKey) > -1">
                      {{ title.substr(0, title.indexOf(searchKey)) }}
                      <span style="color: #f50">{{ searchKey }}</span>
                      {{
                        title.substr(
                          title.indexOf(searchKey) + searchKey.length
                        )
                      }}
                    </span>
                    <span v-else>{{ title }}</span>
                  </template>
                </a-tree>
              </div>
            </template>
          </a-popover>
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
        <a-col :span="12" class="dep">
          <a-form-item label="头像" name="avatar">
            <a-input
              v-model:value="modelRef.avatar"
              placeholder="请输入头像"
              style="width: 200px"
              @change="avatarChange"
            >
              <template #addonAfter>
                <a-popover placement="right">
                  <template #content>
                    <a-image
                      v-if="isImage"
                      :src="imageSrc"
                      :width="300"
                      @error="handleErr"
                    >
                      <template #placeholder> <a-spin /> </template
                    ></a-image>
                    <span v-else>无效的图片链接</span>
                  </template>
                  <template #title>
                    <span>图片预览</span>
                  </template>

                  <eye-outlined />
                </a-popover>
              </template>
            </a-input>
          </a-form-item>
          <a-upload
            v-model:file-list="fileList"
            name="file"
            style="margin-top: 5px"
            accept=".jpg,.jpeg,.png,.gif"
            :headers="accessToken"
            :action="uploadFile"
            :showUploadList="false"
            @change="handleChange"
          >
            <a-button style="margin-top: 5px">
              <cloud-upload-outlined />
              上传图片
            </a-button>
          </a-upload>
        </a-col>
        <a-col :span="12">
          <a-form-item label="角色分配" name="roleIds">
            <a-select
              v-model:value="modelRef.roleIds"
              optionLabelProp="label"
              placeholder="请选择"
              mode="multiple"
            >
              <a-select-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                ><span style="margin-right: 10px">{{ item.name }}</span>
                <span style="color: #ccc">{{ item.description }}</span>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider />
      <div style="margin-bottom: 16px; font-size: 16px">个人资料</div>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所在地区" name="address">
            <a-cascader
              v-model:value="modelRef.address"
              :options="addressOptions"
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
        <a-button type="primary" @click="onSubmit">提交</a-button>
        <a-button @click="onClose">取消</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue"
import { Form, message, type UploadChangeParam } from "ant-design-vue"
import {
  AlignLeftOutlined,
  CloudUploadOutlined,
  EyeOutlined
} from "@ant-design/icons-vue"
import useDepartmentData from "./hooks/useDepartmentData"
import useRoleListData from "./hooks/useRoleListData"
import addressOptions from "@/libs/cascader-address-options"
import { uploadFile } from "@/api/index"
import { getStore } from "@/libs/localStroage"

const props = defineProps<{
  visible: boolean
  // 0 1 2 分别代表 预览 编辑 新增
  type: number
  data?: object
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
  sex: undefined,
  department: "",
  type: undefined,
  avatar: "",
  roleIds: undefined,
  address: undefined,
  street: "",
  birth: "",
  description: "",
  departmentId: ""
})
const rulesRef = reactive({
  username: [
    {
      required: true,
      message: "请输入登录账号",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ],
  nickname: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur"
    }
  ],
  mobile: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur"
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
  // 清空表单
  resetFields()
}
// 部门选择
const clicked = ref(false)
const handleClickChange = (visible: boolean) => {
  clicked.value = visible
}
const searchKey = ref("")
const selectedKeys = ref<string[]>([])
const { treeData, loadTreeData, searchDep } = useDepartmentData()
const handleSelect = (selectedKeys: any, e: any) => {
  modelRef.departmentId = selectedKeys[selectedKeys.length - 1]
  modelRef.department = e.node.title
}

// 角色分配
const { roleList } = useRoleListData()

// 头像上传
const accessToken = {
  accessToken: getStore("accessToken") as string
}

const imageSrc = ref("")
const isImage = ref(true)
const fileList = ref([])
const handleErr = (event: any) => {
  console.log(event)
  isImage.value = false
}
const avatarChange = (e: any) => {
  imageSrc.value = e.target.value
  isImage.value = true
}
const handleChange = (info: UploadChangeParam) => {
  console.log(info)
  if (info.file.status === "done") {
    // message.success(`${info.file.name} file uploaded successfully`)
    if (info.file.response.code == 200) {
      imageSrc.value = info.file.response.result
      modelRef.avatar = info.file.response.result
      isImage.value = true
    } else {
      message.warn(info.file.response.message)
    }
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`)
  }
}

// 编辑类型下数据回显
onMounted(() => {
  if (props.type === 1) {
    // 数据回显
  }
})
</script>
<style lang="scss" scoped>
.dep {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.example {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
  width: 300px;
}
</style>
