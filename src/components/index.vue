<template>
    <div id="index">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <!-- <AirChina-view></AirChina-view> -->
        <!-- <BrowseIndex-view></BrowseIndex-view> -->
        <!-- <CanvasIndex-view></CanvasIndex-view> -->
        <!-- <DarkIndex-view></DarkIndex-view> -->
    </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import AirChina from '@/components/echarts/AirChina' // 中国地图eChart
import BrowseIndex from '@/components/echarts/BrowseIndex' // 报表eChart
import CanvasIndex from '@/components/echarts/CanvasIndex' // 报表eChart
import DarkIndex from '@/components/echarts/DarkIndex' // 跑表eChart
export default {
    name: 'index',
    data() {
        return {
            page: [{
                path: '/',

                text: this.$route.name
            }]
        }
    },
    props: {
        user: Object
    },
    mounted() {},
    components: {
        'breadcrumb-view': breadcrumb,
        'AirChina-view': AirChina,
        'BrowseIndex-view': BrowseIndex,
        'CanvasIndex-view': CanvasIndex,
        'DarkIndex-view': DarkIndex
    }
}
</script>
<style scoped>
</style>
