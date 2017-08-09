<template>
    <div id="DarkIndex"></div>
</template>
<script>
import echarts from 'echarts'
import '../../../static/maps/china.js'
export default {
    name: 'DarkIndex',
    data() {
        return {
            chart: null,
            series: [{
                name: '速度',
                type: 'gauge',
                min: 0,
                max: 220,
                splitNumber: 11,
                radius: '60%',
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.27, 'lime'],
                            [0.73, 'rgba(30,150,255,.7)'],
                            [1, 'rgba(255,70,0,.7)']
                        ],
                        width: 3,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: { // 坐标轴小标记
                    textStyle: { // 属性lineStyle控制线条样式
                        fontWeight: 'bloger',
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: { // 分隔线
                    length: 25, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 3,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: { // 分隔线
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                title: {
                    // show: false
                    offsetCenter: [0, '+100%'], // x, y，单位px
                    textStyle: {
                        color: 'rgba(255,255,255, .6)',
                        fontWeight: 'bloger',
                        fontStyle: 'italic',
                        fontSize: 20
                    }
                },
                detail: {
                    backgroundColor: 'rgba(30,144,255,0.2)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 1,
                    offsetCenter: [0, '50%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bloger',
                        fontSize: 20,
                        color: 'rgba(30,144,255,0.7)'
                    }
                },
                data: [{
                    value: (Math.random() * 100).toFixed(2),
                    name: 'km/h'
                }]
            }, {
                name: '转速',
                type: 'gauge',
                center: ['25%', '35%'], // 默认全局居中
                radius: '40%',
                min: 0,
                max: 7,
                endAngle: 45,
                splitNumber: 7,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.28, 'lime'],
                            [0.72, 'rgba(30,150,255,.7)'],
                            [1, 'rgba(255,70,0,.7)']
                        ],
                        width: 2,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: { // 坐标轴小标记
                    textStyle: { // 属性lineStyle控制线条样式
                        fontWeight: 'bloger',
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 12, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: { // 分隔线
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 3,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width: 5,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                title: {
                    offsetCenter: [0, '-120%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bloger',
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,.6)',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail: {
                    show: false,
                    borderColor: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5,
                    width: 80,
                    height: 30,
                    offsetCenter: [25, '20%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bloger',
                        fontSize: 8,
                        color: '#fff'
                    }
                },
                data: [{
                    value: 1.5,
                    name: 'x1000 r/min'
                }]
            }, {
                name: '油表',
                type: 'gauge',
                center: ['75%', '35%'], // 默认全局居中
                radius: '30%',
                min: 0,
                max: 2,
                startAngle: 135,
                endAngle: 45,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.2, 'lime'],
                            [0.8, 'rgba(30,150,255,.7)'],
                            [1, 'rgba(255,70,0,.7)']
                        ],
                        width: 2,
                        shadowColor: 'rgba(10,175,255, .7)', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: { // 坐标轴小标记
                    length: 12, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                axisLabel: {
                    textStyle: { // 属性lineStyle控制线条样式
                        fontWeight: 'bloger',
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 3,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width: 2,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                title: {
                    offsetCenter: [0, '-140%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bloger',
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,.6)',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 0.5,
                    name: 'Gas'
                }]
            }, {
                name: '水表',
                type: 'gauge',
                center: ['75%', '65%'], // 默认全局居中
                radius: '30%',
                min: 0,
                max: 2,
                startAngle: 315,
                endAngle: 225,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.2, 'lime'],
                            [0.8, 'rgba(30,150,255,.7)'],
                            [1, 'rgba(255,70,0,.7)']
                        ],
                        width: 2,
                        shadowColor: 'rgba(10,175,255, .7)', //默认透明
                        shadowBlur: 10
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    textStyle: { // 属性lineStyle控制线条样式
                        fontWeight: 'bloger',
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                splitLine: { // 分隔线
                    length: 15, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 3,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                pointer: {
                    width: 2,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                title: {
                    offsetCenter: [0, '+140%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bloger',
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,.6)',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 0.5,
                    name: 'Water'
                }]
            }]
        }
    },
    components: {},
    mounted() {
        this.drawData('DarkIndex');
        this.changeseries();
    },
    methods: {
        changeseries() {
            var _that = this;
            setInterval(function() {
                _that.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                _that.series[1].data[0].value = (Math.random() * 7).toFixed(2) - 0;
                _that.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0;
                _that.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0;
                _that.chart.setOption({
                    series: _that.series
                });
            }, 1000);
        },
        getData() {
            var dataUrl = this.baseUrl + 'nutrients';
            this.$http.get(dataUrl).then(res => {});
        },
        drawData(id) {
            // var data = this.getData();
            this.chart = echarts.init(document.getElementById(id))
            this.chart.setOption({
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                series: this.series
            });
        }
    },
    watch: {}
}
</script>
<style scoped>

#DarkIndex {
    width: 400px;
    height: 300px;
}
</style>
