<template>
  <div class="containers">
    <a-card>
      <!-- 搜索输入框区 -->
      <a-row v-show="isSearch" class="search-box">
        <a-form class="my-form" :label-col="labelCol">
          <!-- 非折叠部分 -->
          <a-form-item label="用户名" v-bind="validateInfos.nickname">
            <a-input
              v-model:value="searchObj.nickname"
              placeholder="请输入用户名"
            />
          </a-form-item>
          <a-form-item label="部门" v-bind="validateInfos.department">
            <a-cascader
              v-model:value="searchObj.department"
              :options="options"
              :show-search="{ filter }"
              placeholder="请选择或输入搜索部门"
            />
          </a-form-item>
          <!-- 折叠部分 -->
          <a-form-item
            label="手机号"
            v-bind="validateInfos.mobile"
            v-show="!isCollapse"
          >
            <a-input
              v-model:value="searchObj.mobile"
              placeholder="请输入手机号"
            />
          </a-form-item>
          <a-form-item
            label="邮箱"
            v-bind="validateInfos.email"
            v-show="!isCollapse"
          >
            <a-input v-model:value="searchObj.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item
            label="性别"
            v-bind="validateInfos.sex"
            v-show="!isCollapse"
          >
            <a-select v-model:value="searchObj.sex" placeholder="请选择性别">
              <a-select-option value="男">男</a-select-option>
              <a-select-option value="女">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="登录账号"
            v-bind="validateInfos.username"
            v-show="!isCollapse"
          >
            <a-input
              v-model:value="searchObj.username"
              placeholder="请输入登录账号"
            />
          </a-form-item>
          <a-form-item
            label="用户ID"
            v-bind="validateInfos.id"
            v-show="!isCollapse"
          >
            <a-input v-model:value="searchObj.id" placeholder="请输入用户ID" />
          </a-form-item>
          <a-form-item
            label="创建时间"
            v-bind="validateInfos.selectDate"
            v-show="!isCollapse"
          >
            <a-range-picker v-model:value="searchObj.selectDate" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSubmit">
              <template #icon><SearchOutlined /></template>
              搜索
            </a-button>
            <a-button style="margin: 0px 15px 0px 10px">重置</a-button>
            <a @click.prevent="isCollapse = !isCollapse"
              >展开<down-outlined v-show="isCollapse" /><up-outlined
                v-show="!isCollapse"
            /></a>
          </a-form-item>
        </a-form>
      </a-row>
      <!-- 表格按钮操作区 -->
      <a-row justify="space-between" align="middle" class="btn-box">
        <!-- 左侧按钮 -->
        <div class="btn-left">
          <a-button type="primary">
            <template #icon><plus-outlined /></template>
            添加用户
          </a-button>
          <a-button style="margin: 0px 6px">
            <template #icon><delete-outlined /></template>
            批量删除
          </a-button>
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">重置用户密码</a-menu-item>
                <a-menu-item key="2">导出所选数据</a-menu-item>
                <a-menu-item key="3">导出全部数据</a-menu-item>
                <a-menu-item key="4">导入数据(付费)</a-menu-item>
              </a-menu>
            </template>
            <a-button>
              更多操作
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
        <!-- 右侧图标按钮 -->
        <div class="btn-right">
          <a-tooltip title="刷新"><reload-outlined /></a-tooltip>
          <a-tooltip :title="isSearch ? '关闭搜索' : '开启搜索'">
            <search-outlined @click="isSearch = !isSearch"
          /></a-tooltip>
          <a-tooltip :title="isPrompt ? '关闭提示' : '开启提示'"
            ><bulb-outlined @click="isPrompt = !isPrompt"
          /></a-tooltip>
          <a-tooltip title="表格密度">
            <a-dropdown :trigger="['click']" placement="bottom">
              <align-left-outlined />
              <template #overlay>
                <a-menu
                  v-model:selectedKeys="tableSelectedKeys"
                  @click="tableSizeClick"
                >
                  <a-menu-item key="middle">默认</a-menu-item>
                  <a-menu-item key="default">宽松</a-menu-item>
                  <a-menu-item key="small">紧密</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-tooltip>
        </div>
      </a-row>
      <!-- 提示信息区 -->
      <a-row v-show="isPrompt" class="info-box">
        <a-alert type="info" show-icon class="info">
          <template #message>已选择 0 项 <a>清空</a></template>
        </a-alert>
      </a-row>
      <!-- 表格区 -->
      <a-row class="table-area">
        <!-- 表格 -->
        <a-table
          :columns="columns"
          :data-source="tableData"
          :scroll="{ x: 960 }"
          :row-selection="rowSelection"
          :pagination="false"
          :size="tableSize"
          :loading="isLoading"
          bordered
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
              <a>编辑</a>
              <a-divider type="vertical" />
              <a>禁用</a>
              <a-divider type="vertical" />
              <a>删除</a>
            </template>
            <template v-if="column.key === 'avatar'">
              <a-avatar :src="record.avatar" />
            </template>
            <template v-if="column.key === 'type'">
              <a-tag v-if="record.type === 0">普通用户</a-tag>
              <a-tag v-else color="processing">管理员</a-tag>
            </template>
            <template v-if="column.key === 'status'">
              <a-badge
                v-if="record.status === 0"
                status="success"
                text="启用"
              />
              <a-badge v-else status="error" text="禁用" />
            </template>
          </template>
        </a-table>
      </a-row>
      <!-- 分页区 -->
      <a-row justify="end" class="pagination-box">
        <a-pagination
          v-model:current="searchObj.pageNumber"
          v-model:pageSize="searchObj.pageSize"
          class="my-pagination"
          size="small"
          show-size-changer
          show-quick-jumper
          :total="total"
          :show-total="(total) => `共 ${total} 条`"
          @change="pageChange"
        />
      </a-row>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from "vue"
import { Form } from "ant-design-vue"
import {
  SearchOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
  BulbOutlined,
  AlignLeftOutlined
} from "@ant-design/icons-vue"
import type { CascaderProps, MenuProps, TableColumnsType } from "ant-design-vue"
import type { ShowSearchType } from "ant-design-vue/es/cascader"
import type { SizeType } from "ant-design-vue/es/config-provider/context"
import useUserListData from "./useUserListData"

/* 搜索功能相关数据方法 */
const labelCol = { style: { width: "70px" } }
// 折叠部分
const isCollapse = ref(true)
// 搜索表单数据
// 查询对象
/* const searchObj = reactive<IUserListParam>({
  id: modelRef.id,
  nickname: modelRef.nickname,
  username: modelRef.username,
  mobile: modelRef.mobile,
  email: modelRef.email,
  sex: modelRef.sex,
  // type:
  // status:
  pageNumber: currentPage.value,
  pageSize: pageSize.value,
  sort: "createTime",
  order: "desc"
  // startDate:
  // endDate:
}) */
const searchObj = reactive<IUserListParam>({
  nickname: "",
  department: undefined,
  mobile: "",
  email: "",
  sex: undefined,
  username: "",
  id: "",
  selectDate: undefined,
  departmentId: "",
  type: undefined,
  status: undefined,
  pageNumber: 1,
  pageSize: 10,
  sort: "createTime",
  order: "desc",
  startDate: "",
  endDate: ""
})
// 表单校验规则
const rulesRef = reactive({
  nickname: [
    {
      max: 12,
      message: "用户名不超过12个字符"
    }
  ]
})
// 部门级联选择框
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
const filter: ShowSearchType["filter"] = (inputValue, path) => {
  return path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  )
}
// 获取表单数据及操作
const useForm = Form.useForm
const { resetFields, validate, validateInfos } = useForm(searchObj, rulesRef, {
  onValidate: (...args) => console.log(...args)
})
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(searchObj))
      debugger
      getUserList(searchObj)
    })
    .catch((err) => {
      console.log("error", err)
    })
}

/* 按钮操作区功能 */
// 搜索功能开关
const isSearch = ref(true)
// 信息提示开关
const isPrompt = ref(true)
// 表格密度
const tableSize = ref<SizeType>("middle")
const tableSelectedKeys = ref(["middle"])
const tableSizeClick: MenuProps["onClick"] = (e) => {
  tableSelectedKeys.value = [e.key as string]
  tableSize.value = e.key as SizeType
}

/* 提示信息区功能 */

/* 表格区功能 */
// 列布局
const columns: TableColumnsType<IUserInfoRes> = [
  {
    title: "#",
    width: 60,
    fixed: "left",
    align: "center",
    customRender: ({ index }) => index + 1
  },
  {
    title: "登录账号",
    width: 125,
    dataIndex: "username",
    key: "username",
    fixed: "left",
    sorter: (a: IUserInfoRes, b: IUserInfoRes) =>
      a.username.length - b.username.length
  },
  {
    title: "用户名",
    width: 125,
    dataIndex: "nickname",
    key: "nickname",
    fixed: "left",
    sorter: (a: IUserInfoRes, b: IUserInfoRes) =>
      a.nickname.length - b.nickname.length
  },
  {
    title: "头像",
    dataIndex: "avatar",
    key: "avatar",
    width: 80,
    align: "center"
  },
  {
    title: "所属部门",
    dataIndex: "departmentId",
    key: "departmentId",
    width: 120
  },
  {
    title: "手机",
    dataIndex: "mobile",
    key: "mobile",
    width: 125,
    sorter: (a: IUserInfoRes, b: IUserInfoRes) =>
      a.mobile.length - b.mobile.length
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 180,
    sorter: (a: IUserInfoRes, b: IUserInfoRes) =>
      a.email.length - b.email.length
  },
  { title: "性别", dataIndex: "gender", key: "gender", width: 65 },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    align: "center",
    width: 110,
    filters: [
      {
        text: "全部",
        value: 2
      },
      {
        text: "普通用户",
        value: 0
      },
      {
        text: "管理员",
        value: 1
      }
    ],
    filterMultiple: false,
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record: IUserInfoRes) => {
      if (value === 2) return true
      return record.type === value
    }
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    align: "center",
    width: 100,
    filters: [
      {
        text: "全部",
        value: 2
      },
      {
        text: "启用",
        value: 0
      },
      {
        text: "禁用",
        value: -1
      }
    ],
    filterMultiple: false,
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record: IUserInfoRes) => {
      if (value === 2) return true
      return record.type === value
    }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 180,
    sorter: (a: IUserInfoRes, b: IUserInfoRes) =>
      a.createTime.length - b.createTime.length
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    align: "center",
    width: 170
  }
]
// 选择框
const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: any[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    )
  },
  onSelect: (record: any, selected: boolean, selectedRows: any[]) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: any[], changeRows: any[]) => {
    console.log(selected, selectedRows, changeRows)
  }
})

/* 分页区功能 */
// 页码或每页条数改变
const pageChange = (page: number, size: number) => {
  // 改变页码和每页条数，重新获取数据
  searchObj.pageNumber = page
  searchObj.pageSize = size
  getUserList(searchObj)
}

// 调接口获取表格数据
const { tableData, total, isLoading, getUserList } = useUserListData()

getUserList(searchObj)
</script>
<style lang="scss" scoped>
@import url("./userManage.scss");
</style>
