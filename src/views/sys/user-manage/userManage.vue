<template>
  <div class="containers">
    <a-card>
      <!-- 搜索输入框区 -->
      <div class="searchBox">
        <a-form class="my-form" :label-col="labelCol">
          <!-- 非折叠部分 -->
          <a-form-item label="用户名" v-bind="validateInfos.name">
            <a-input v-model:value="modelRef.name" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="部门" v-bind="validateInfos.department">
            <a-cascader
              v-model:value="modelRef.department"
              :options="options"
              :show-search="{ filter }"
              placeholder="请选择或输入搜索部门"
            />
          </a-form-item>
          <!-- 折叠部分 -->
          <a-form-item
            label="手机号"
            v-bind="validateInfos.phone"
            v-show="!isCollapse"
          >
            <a-input
              v-model:value="modelRef.phone"
              placeholder="请输入手机号"
            />
          </a-form-item>
          <a-form-item
            label="邮箱"
            v-bind="validateInfos.email"
            v-show="!isCollapse"
          >
            <a-input v-model:value="modelRef.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item
            label="性别"
            v-bind="validateInfos.gender"
            v-show="!isCollapse"
          >
            <a-select v-model:value="modelRef.gender" placeholder="请选择性别">
              <a-select-option value="1">男</a-select-option>
              <a-select-option value="0">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="登录账号"
            v-bind="validateInfos.user"
            v-show="!isCollapse"
          >
            <a-input
              v-model:value="modelRef.user"
              placeholder="请输入登录账号"
            />
          </a-form-item>
          <a-form-item
            label="用户ID"
            v-bind="validateInfos.id"
            v-show="!isCollapse"
          >
            <a-input v-model:value="modelRef.id" placeholder="请输入用户ID" />
          </a-form-item>
          <a-form-item
            label="创建时间"
            v-bind="validateInfos.createTime"
            v-show="!isCollapse"
          >
            <a-range-picker v-model:value="modelRef.createTime" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary">
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
      </div>
      <!-- 表格按钮操作区 -->
      <div class="btn-box">
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
          <a-tooltip>
            <template #title>刷新</template>
            <reload-outlined
          /></a-tooltip>
          <a-tooltip>
            <template #title>关闭搜索</template>
            <search-outlined
          /></a-tooltip>
          <a-tooltip>
            <template #title>关闭提示</template>
            <bulb-outlined
          /></a-tooltip>
          <a-tooltip>
            <template #title>表格密度</template>
            <a-dropdown :trigger="['click']" placement="bottom">
              <align-left-outlined />
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">默认</a-menu-item>
                  <a-menu-item key="1">宽松</a-menu-item>
                  <a-menu-item key="3">紧密</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-tooltip>
        </div>
      </div>
      <!-- 表格区 -->
      <div class="table-area">
        <!-- 表格提示信息 -->
        <a-alert type="info" show-icon class="info">
          <template #message>已选择 0 项 <a>清空</a></template>
        </a-alert>
        <!-- 表格 -->
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 960 }"
          :row-selection="rowSelection"
          :pagination="false"
          size="middle"
          bordered
        >
          <template #bodyCell="{ column }">
            <template v-if="column.key === 'operation'">
              <a>编辑</a>
              <a-divider type="vertical" />
              <a>禁用</a>
              <a-divider type="vertical" />
              <a>删除</a>
            </template>
          </template>
        </a-table>
        <a-pagination
          class="my-pagination"
          size="small"
          show-size-changer
          show-quick-jumper
          :total="50"
          :show-total="(total) => `共 ${total} 条`"
        />
      </div>
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
import type { CascaderProps, TableColumnsType } from "ant-design-vue"
import type { ShowSearchType } from "ant-design-vue/es/cascader"
import type { Dayjs } from "dayjs"
type RangeValue = [Dayjs, Dayjs]

const useForm = Form.useForm

const labelCol = { style: { width: "70px" } }
const isCollapse = ref(true)

const activeKey = ref(["1"])
const value = ref<string[]>([])

// 表格
const columns: TableColumnsType<any> = [
  {
    title: "#",
    width: 60,
    dataIndex: "id",
    key: "id",
    fixed: "left",
    align: "center"
  },
  {
    title: "登录账号",
    width: 125,
    dataIndex: "user",
    key: "user",
    fixed: "left",
    sorter: (a: any, b: any) => a.user.length - b.user.length
  },
  {
    title: "用户名",
    width: 125,
    dataIndex: "nick",
    key: "nick",
    fixed: "left",
    sorter: (a: any, b: any) => a.nick.length - b.nick.length
  },
  { title: "头像", dataIndex: "avatar", key: "avatar", width: 80 },
  { title: "所属部门", dataIndex: "department", key: "department", width: 120 },
  {
    title: "手机",
    dataIndex: "phone",
    key: "phone",
    width: 125,
    sorter: (a: any, b: any) => a.phone.length - b.phone.length
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 180,
    sorter: (a: any, b: any) => a.email.length - b.email.length
  },
  { title: "性别", dataIndex: "gender", key: "gender", width: 65 },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    width: 110,
    filters: [
      {
        text: "全部",
        value: "all"
      },
      {
        text: "管理员",
        value: "admin"
      },
      {
        text: "用户",
        value: "user"
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0
  },
  { title: "状态", dataIndex: "status", key: "status", width: 100 },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 180,
    sorter: (a: any, b: any) => a.createTime.length - b.createTime.length,
    filters: [
      {
        text: "全部",
        value: "all"
      },
      {
        text: "启用",
        value: "enable"
      },
      {
        text: "禁用",
        value: "disable"
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    align: "center",
    width: 170
  }
]
const data: any = []
for (let i = 0; i < 11; i++) {
  data.push({
    key: i,
    id: i,
    user: `user ${i}`,
    nick: `nick ${i}`,
    phone: 18100175261
  })
}
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

// 级联选择框
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

// 搜索表单
const modelRef = reactive({
  name: "",
  department: undefined,
  phone: "",
  email: "",
  gender: undefined,
  user: "",
  id: "",
  createTime: undefined
})
const rulesRef = reactive({
  name: [
    {
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
<style lang="scss" scoped>
@import url("./userManage.scss");
</style>
