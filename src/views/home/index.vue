<template>
  <div>
    <div v-if="!currNavName || currNavName == 'xboot'" class="home">
      <a-row :gutter="10">
        <!-- 左上侧 用户信息及github链接 -->
        <a-col :xs="24" :sm="24" :lg="24" :xl="8">
          <a-row :gutter="10">
            <a-col style="margin-bottom: 10px; width: 100%">
              <a-card :padding="0">
                <div class="welcome-card">
                  <div class="left">
                    <div class="user">
                      <a-avatar
                        v-if="avatar"
                        :src="avatar"
                        :size="60"
                        class="avatar-img"
                      ></a-avatar>
                      <a-avatar v-else :size="60" class="avatar-icon"
                        ><template #icon><UserOutlined /></template
                      ></a-avatar>
                      <div class="info">
                        <p class="username">Hi, {{ nickname }} !</p>
                        <p class="welcome">欢迎回到XBoot快速开发平台</p>
                      </div>
                    </div>
                    <div class="list">
                      <div class="p">
                        <div class="dot"></div>
                        您当前所在的部门为：{{ departmentTitle }}
                      </div>
                      <div class="p">
                        <div class="dot"></div>
                        您当前的用户类型为：{{ userType }}
                      </div>
                      <div class="p">
                        <div class="dot"></div>
                        本次登录地点：{{ city }}
                      </div>
                    </div>
                  </div>
                  <img class="pic" src="@/assets/icon/computer.svg" />
                </div>
              </a-card>
            </a-col>
            <a-col style="margin-bottom: 10px; width: 100%">
              <a-card>
                <template #title>
                  <github-filled style="margin-right: 5px; font-size: 20px" />
                  <a href="https://github.com/Exrick/x-boot" target="_blank"
                    >XBoot开源版本地址</a
                  >
                  ></template
                >
                <template #extra
                  ><a target="_blank" href="http://exrick.cn"
                    >作者：Exrick</a
                  ></template
                >
                <div class="timeline-content">
                  <a-timeline>
                    <a-timeline-item>
                      <template #dot>
                        <youtube-filled style="color: #fb7299" />
                      </template>
                      <a @click="showVideo = true"
                        >作者亲自制作XBoot文字快闪宣传片</a
                      >
                    </a-timeline-item>

                    <a-timeline-item>
                      <template #dot>
                        <youtube-filled style="color: #fb7299"
                      /></template>
                      <a
                        href="https://www.bilibili.com/video/av23121122/"
                        target="_blank"
                        >作者亲自制作各项目宣传视频 点我观看</a
                      >
                    </a-timeline-item>
                    <a-timeline-item>
                      <template #dot>
                        <box-plot-filled style="color: black"
                      /></template>
                      <a
                        href="https://github.com/Exrick/Machine-Learning"
                        target="_blank"
                        >个人机器学习笔记</a
                      >
                    </a-timeline-item>
                    <a-timeline-item>
                      <template #dot>
                        <shopping-cart-outlined style="color: #f4364c"
                      /></template>
                      <a href="http://xmall.exrick.cn" target="_blank"
                        >XMall开源分布式商城</a
                      >
                    </a-timeline-item>
                    <a-timeline-item>
                      <template #dot>
                        <money-collect-filled style="color: #19be6b"
                      /></template>
                      <a href="http://xpay.exrick.cn" target="_blank"
                        >XPay开源个人免签支付系统</a
                      >
                    </a-timeline-item>
                    <a-timeline-item>
                      <template #dot>
                        <question-circle-filled style="color: #57a3f3"
                      /></template>
                      <a href="http://xpay.exrick.cn" target="_blank"
                        >QQ交流群 475743731(付费) 562962309(免费)</a
                      >
                    </a-timeline-item>
                  </a-timeline>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <!-- 右上侧 -->
        <a-col :lg="24" :xl="16">
          <a-row :gutter="10">
            <a-col
              :xs="24"
              :sm="24"
              :lg="24"
              :xl="12"
              style="margin-bottom: 10px"
            >
              <a-card>
                <template #title>
                  <a href="http://xpay.exrick.cn/pay?xboot" target="_blank">
                    <star-filled style="margin-right: 5px; font-size: 20px" />
                    <a-badge dot>立即获取 XBoot 完整版</a-badge>
                  </a>
                </template>
                <div class="buy-content">
                  <div class="qr">
                    <img src="@/assets/qr.png" width="130" />
                    <span class="des">手机扫一扫支付，限时优惠</span>
                  </div>
                  <a-alert
                    type="warning"
                    show-icon
                    style="padding: 8px 8px 8px 36px; font-size: 12px"
                  >
                    <template #description>
                      价格上调提示：App端开发中，价格即将上调，请尽快获取！永久更新！
                    </template>
                  </a-alert>
                  <div class="flex">
                    完整版(仅供学习)：
                    <span class="rmb">￥</span>
                    <span class="price">{{ price }}</span>
                    <span class="origin">￥</span>
                    <s class="origin">398</s>
                    <a-button
                      to="http://xpay.exrick.cn/pay?xboot"
                      target="_blank"
                      type="primary"
                      danger
                      style="margin-left: 10px"
                    >
                      <template #icon>
                        <highlight-filled />
                      </template>
                      立即获取</a-button
                    >
                  </div>
                  <div class="flex">
                    商用授权：
                    <span class="rmb">￥</span>
                    <span class="price">?998</span>
                    <span class="origin">￥</span>
                    <s class="origin">9998</s>
                    <span class="origin" style="font-size: 8px">起</span>
                    <a-button
                      to="http://wpa.qq.com/msgrd?v=3&uin=1012139570&site=qq&menu=yes"
                      target="_blank"
                      type="primary"
                      style="margin-left: 10px; background-color: #ffa825"
                      ><template #icon> <gitlab-filled /> </template
                      >获取商用授权</a-button
                    >
                    <br />
                  </div>
                  <a-alert style="padding: 8px 16px 8px 16px; font-size: 12px">
                    <template #description>
                      支付后源码和更新维护群将自动发至您在支付页面所填写的邮箱，
                      <span class="light">
                        完整版与商用版都拥有在线demo全部功能，提供永久免费更新，但前者仅供学习使用。</span
                      >
                      开源版本请遵循GPLv3.0开源协议，
                      <span class="light">不得闭源</span
                      >，商用需求请联系作者签署授权协议。
                      价格可能随功能逐渐完善或物价变化。
                    </template>
                  </a-alert>
                </div>
              </a-card>
            </a-col>
            <a-col :xs="24" :sm="24" :xl="12" style="margin-bottom: 10px">
              <a-card>
                <template #title>
                  <book-outlined style="margin-right: 5px" />
                  ISSUE/评论/更新日志
                </template>
                <div id="comments" class="comment-container"></div>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <a-row
        :gutter="10"
        style="height: 166px; overflow: hidden; margin-bottom: 10px"
      >
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <a-card style="height: 100%">
            <a-card-meta>
              <template #avatar>
                <money-collect-outlined style="font-size: 34px" />
              </template>
            </a-card-meta>
            <a-card-meta title="Europe Street beat">
              <template #description>www.instagram.com</template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <a-card style="height: 100%">
            <p>销售量增长</p>
            <p><span>68%</span><span>相比昨日</span></p>
            <a-progress :percent="68" :show-info="false" />
          </a-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <a-card style="height: 100%"
            ><p>待办事项</p>
            <p>2023年07月28日</p>
            <p>您有一个新的待审批任务，请前往查看</p></a-card
          >
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <a-card style="height: 100%">
            <a-card-meta>
              <template #avatar>
                <appstore-filled style="font-size: 34px" />
              </template>
            </a-card-meta>
            <a-card-meta title="应用中心">
              <template #description>销量统计，用户统计，日活分析</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="10" class="sec">
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <a-card>
            <div class="center">
              <container-filled style="font-size: 34px" />
              <span>SaaS应用</span>
            </div>
          </a-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <a-card>
            <div class="center">
              <container-filled style="font-size: 34px" />
              <span>SaaS应用</span>
            </div>
          </a-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <a-card>
            <div class="center">
              <container-filled style="font-size: 34px" />
              <span>SaaS应用</span>
            </div>
          </a-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <a-card>
            <div class="center">
              <container-filled style="font-size: 34px" />
              <span>SaaS应用</span>
            </div>
          </a-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <a-card>
            <div class="center">
              <container-filled style="font-size: 34px" />
              <span>SaaS应用</span>
            </div>
          </a-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="4"
          :style="{ marginBottom: '10px' }"
        >
          <a-card>
            <div class="center">
              <container-filled style="font-size: 34px" />
              <span>SaaS应用</span>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <!--
      <a-row :gutter="10">
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card5"
            :bordered="false"
            :end-val="126778"
            title="今日新增互动数"
            backgroundColor="#fff4df"
            :image="require('@/assets/icon/comment.png')"
            width="34px"
            height="34px"
          />
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card6"
            :bordered="false"
            :end-val="68893"
            backgroundColor="#6993fe"
            countColor="#fff"
            icon="md-person-add"
            iconColor="#fff"
            titleColor="#fff"
            title="今日新增用户"
          />
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card7"
            :bordered="false"
            :end-val="count.data4"
            backgroundColor="#8950fe"
            countColor="#fff"
            icon="md-cloud-download"
            iconColor="#fff"
            titleColor="#fff"
            title="今日下载量"
          />
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="6"
          :style="{ marginBottom: '10px' }"
        >
          <card1
            id="card8"
            :bordered="false"
            :end-val="13507632434"
            backgroundColor="#f64e61"
            countColor="#fff"
            icon="md-calendar"
            iconColor="#fff"
            titleColor="#fff"
            title="月活"
          />
        </a-col>
      </a-row>-->
      <a-row :gutter="10">
        <a-col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="16"
          :style="{ marginBottom: '10px' }"
        >
          <visitVolume />
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :lg="24"
          :xl="8"
          :style="{ marginBottom: '10px' }"
        >
          <visitSeparation />
        </a-col>
      </a-row>
    </div>
    <div v-if="currNavName == 'app'">
      <h1>app</h1>
      <!-- <Dashboard /> -->
    </div>

    <a-modal
      v-model:visible="showVideo"
      title="作者亲自制作XBoot炫酷文字快闪宣传片"
      :styles="{ top: '30px' }"
      footer-hide
      width="1000"
    >
      <iframe
        src="//player.bilibili.com/player.html?aid=30284667&cid=52827707&page=1"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        style="width: 100%; height: 550px"
      ></iframe>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { storeToRefs } from "pinia"
import {
  GithubFilled,
  YoutubeFilled,
  BoxPlotFilled,
  ShoppingCartOutlined,
  MoneyCollectFilled,
  QuestionCircleFilled,
  BookOutlined,
  StarFilled,
  UserOutlined,
  HighlightFilled,
  GitlabFilled,
  MoneyCollectOutlined,
  AppstoreFilled,
  ContainerFilled
} from "@ant-design/icons-vue"
import { useAppStore, useUserStore } from "../../stores"
// 从store中读取信息
const appStore = useAppStore()
const userStore = useUserStore()
const { currNavName } = storeToRefs(appStore)
const { avatar, nickname, departmentTitle, type } = storeToRefs(userStore)

// 组件内变量
const showVideo = ref(false)
const city = ref("未知")
const price = ref("...")

// 用户类型
const userType = computed(() => {
  return type.value === 1 ? "管理员" : "普通用户"
})
</script>

<style scoped lang="scss">
@import url("./home.scss");
</style>
