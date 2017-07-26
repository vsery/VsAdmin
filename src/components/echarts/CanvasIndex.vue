<template>
    <div id="CanvasIndex"></div>
</template>
<script>
import echarts from 'echarts'
import '../../../static/maps/china.js'
export default {
    name: 'CanvasIndex',
    data() {
        return {
            eChartsTheme: null,
            chart: null,
            dataAxis: [],
            dataTab1: [],
            dataTab2: [],
            dataTab3: [],
            base: new Date(2016, 5, 28),
            oneDay: 24 * 3600 * 1000,
            now: null
        }
    },
    components: {},
    props: {
        user: Object
    },
    mounted() {
        this.getDataTable();
        this.drawData('CanvasIndex');
        this.updateDataTable();
    },
    methods: {
        updateDataTable() {
            var _that = this;
            setInterval(function() {
                _that.changeData(true);
                _that.chart.setOption({
                    xAxis: {
                        data: _that.dataAxis
                    },
                    series: [{
                        data: _that.dataTab1
                    }, {
                        data: _that.dataTab2
                    }, {
                        data: _that.dataTab3
                    }]
                });
            }, 2000);
        },
        // 获取数据
        getDataTable() {
            for (var i = 0; i < 20; i++) {
                this.changeData();
            }
        },
        // 修改数据 
        changeData(shift) {
            this.now = [this.base.getFullYear(), this.base.getMonth() + 1, this.base.getDate()].join('/');
            this.dataAxis.push(this.now);

            var _value1 = Math.random() * 2000,
                _value2 = Math.random() * 2000,
                _value3 = Math.random() * 1500;
            this.dataTab1.push(_value1);
            this.dataTab2.push(_value2);
            this.dataTab3.push(_value3);
            if (shift) {
                this.dataTab1.shift();
                this.dataTab2.shift();
                this.dataTab3.shift();
                this.dataAxis.shift();
            }

            this.base = new Date(+new Date(this.base) + this.oneDay);
        },
        // 获取主题样式, 暂时没看见效果
        getTheme() {
            this.menuUrl = this.baseUrl + 'eChartsTheme';
            var params = {
                'token': this.user.token
            }
            this.$http.get(this.menuUrl, {
                params: params
            }).then(res => {
                var resData = res.data;
                this.eChartsTheme = resData;
            });
        },
        // 构建eCharts
        drawData(id) {
            // this.getTheme();
            // echarts.registerTheme('customed', this.eChartsTheme);
            this.chart = echarts.init(document.getElementById(id), 'customed');
            this.chart.setOption({
                title: {
                    show: false,
                    text: '特性示例：渐变色 阴影 点击缩放',
                    subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom',
                    textAlign: 'center',
                    top: 'top',
                    left: 'center'
                },
                xAxis: {
                    show: true,
                    data: this.dataAxis,
                    axisLabel: {
                        inside: true,
                        textStyle: {
                            color: 'rgba(255,255,255,.3)'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true
                    },
                    z: 10
                },
                yAxis: {
                    show: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255,255,255,.7)'
                        }
                    }
                },
                dataZoom: [{
                    // type: 'inside'
                    type: 'slider'
                }],
                series: [{
                    type: 'line',
                    name: 'A',
                    stack: 'a',
                    itemStyle: {
                        normal: {
                            color: 'rgba(10,175,255,.5)'
                        }
                    },
                    data: this.dataTab1
                }, {
                    type: 'bar',
                    name: 'B',
                    stack: 'b',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(10, 255, 175,.05)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(10, 255, 175,.07)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(10, 255, 175,.1)'
                                }]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(10, 255, 175,.1)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(10, 255, 175,.2)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(10, 255, 175,.3)'
                                }]
                            )
                        }
                    },
                    data: this.dataTab2
                }, {
                    type: 'line',
                    name: 'Love',
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 60, 5,.5)'
                        }
                    },
                    data: this.dataTab3
                }],
                legend: {
                    show: true,
                    left: '1.25%',
                    top: 'bottom',
                    textStyle: {
                        color: 'rgba(10, 175, 255, .75)',
                    },
                    data: ['A', 'B', 'Love']
                }
            });
        }
    },
    watch: {}
}
</script>
<style scoped>
#CanvasIndex {
    width: 100%;
    height: 190px;
}
</style>
