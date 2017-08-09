<template>
    <div id="index">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <el-row>
            <el-col :span="6">
                <el-card>
                    <!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
                    <div style="padding: 14px;">
                        <span>皮肤选择</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
                    <div style="padding: 14px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
                    <div style="padding: 14px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <!-- <img src="~examples/assets/images/hamburger.png" class="image"> -->
                    <div style="padding: 14px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
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
            }],
            currentDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
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
