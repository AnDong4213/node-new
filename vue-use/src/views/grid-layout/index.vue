<template>
  <div class="grid-layout">
    <!-- <grid-layout v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true"
      :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true">
      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
        {{ item.i }}
      </grid-item>
    </grid-layout> -->
    <ChartEl></ChartEl>
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue'
import { GridItem, GridLayout } from 'vue3-grid-layout-next';

// const { GridLayout, GridItem } = VueGridLayout
const layout = ref([
  { "x": 0, "y": 0, "w": 2, "h": 2, "i": "0" },
  { "x": 2, "y": 0, "w": 2, "h": 4, "i": "1" },
  { "x": 4, "y": 0, "w": 2, "h": 5, "i": "2" },
  { "x": 6, "y": 0, "w": 2, "h": 3, "i": "3" },
  { "x": 8, "y": 0, "w": 2, "h": 3, "i": "4" },
  { "x": 10, "y": 0, "w": 2, "h": 3, "i": "5" },
  { "x": 0, "y": 5, "w": 2, "h": 5, "i": "6" },
  { "x": 2, "y": 5, "w": 2, "h": 5, "i": "7" },
  { "x": 4, "y": 5, "w": 2, "h": 5, "i": "8" },
  { "x": 6, "y": 3, "w": 2, "h": 4, "i": "9" },
  { "x": 8, "y": 4, "w": 2, "h": 4, "i": "10" },
])

const ChartEl = () => {
  return (
    <div>
      <GridLayout layout={layout.value} isDraggable={true} colNum={12} rowHeight={30} isResizable={false} isMirrored={false} verticalCompact={true} margin={[10, 10]} useCssTransforms={true}>
        {
          layout.value.map((item) => {
            return (
              <GridItem i={item.i} key={item.i} w={item.w} h={item.h} x={item.x} y={item.y}>{item.i}</GridItem>
            )
          })
        }
      </GridLayout>
    </div>
  )
}

</script>
<style></style>
