<template>
  <div class="visit">
    <a-card>
      <template #title>
        <area-chart-outlined style="margin-right: 5px" />每日来访量统计
      </template>
      <template #extra>
        <a-range-picker v-model:value="dateValue" style="width: 250px" />
      </template>
      <div style="height: 360px">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { AreaChartOutlined } from "@ant-design/icons-vue"

const dateValue = ref<[string, string]>(["", ""])
const series = ref([
  {
    name: "PRODUCT A",
    data: [44, 55, 41, 67, 22, 43]
  },
  {
    name: "PRODUCT B",
    data: [13, 23, 20, 8, 13, 27]
  },
  {
    name: "PRODUCT C",
    data: [11, 17, 15, 15, 21, 14]
  },
  {
    name: "PRODUCT D",
    data: [21, 7, 25, 13, 22, 8]
  }
])
const chartOptions = ref({
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0
        }
      }
    }
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "13px",
            fontWeight: 900
          }
        }
      }
    }
  },
  xaxis: {
    type: "datetime",
    categories: [
      "01/01/2011 GMT",
      "01/02/2011 GMT",
      "01/03/2011 GMT",
      "01/04/2011 GMT",
      "01/05/2011 GMT",
      "01/06/2011 GMT"
    ]
  },
  legend: {
    position: "right",
    offsetY: 40
  },
  fill: {
    opacity: 1
  }
})
</script>
<style lang="scss" scoped></style>
