<template>
  <div class="sep">
    <a-card>
      <template #title>
        <aim-outlined style="margin-right: 5px" />访问用户分布
      </template>
      <div style="height: 360px; display: flex; align-items: center">
        <apexchart
          type="donut"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { AimOutlined } from "@ant-design/icons-vue"

const series = ref([44, 55, 41, 17, 15])
const chartOptions = ref({
  chart: {
    type: "donut"
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true
          }
        }
      }
    }
  },
  labels: ["移动端", "PC", "平板", "IOS", "其他"]
})
</script>
<style lang="scss" scoped>
.sep {
  :deep(.ant-card) {
    .ant-card-head {
      height: 65px;
    }
  }
}
</style>
