<template>
    <div id="BrowseIndex"></div>
</template>
<script>
import echarts from 'echarts'
import '../../../static/maps/china.js'
export default {
    name: 'BrowseIndex',
    data() {
        return {
            chart: null,
            dataXis: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
            dataList1: [],
            dataList2: [],
            dataList3: []
        }
    },
    components: {},
    mounted() {
        this.getDataList();
        this.drawData('BrowseIndex');
        this.updateDataList();
    },
    methods: {
        updateDataList() {
            var _that = this;
            setInterval(function() {
                _that.changeDataList(true);
                _that.chart.setOption({
                    series: [{
                        data: _that.dataList1
                    }, {
                        data: _that.dataList2
                    }, {
                        data: _that.dataList3
                    }]
                });
            }, 2000);
        },
        getDataList() {
            for (var i = 0; i < 11; i++) {
                this.changeDataList();
            }
        },
        changeDataList(shift) {
            var _value1 = parseInt(Math.random() * 10),
                _value2 = parseInt(Math.random() * 10),
                _value3 = parseInt(Math.random() * 10);
            this.dataList1.push(_value1);
            this.dataList2.push(_value2);
            this.dataList3.push(_value3);
            if (shift) {
                this.dataList1.shift();
                this.dataList2.shift();
                this.dataList3.shift();
            }
        },
        drawData(id) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.setOption({
                angleAxis: {
                    splitLine: {
                        show: false
                    },
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255,255,255, .6)'
                        }
                    },
                    data: this.dataXis,
                },
                radiusAxis: {
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(10,175,255, .3)'
                        }
                    },
                },
                polar: {},
                series: [{
                    // type: 'bar',
                    type: 'line',
                    data: this.dataList1,
                    coordinateSystem: 'polar',
                    name: 'A',
                    stack: 'a',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 60, 5, .5)'
                                }, {
                                    offset: 0.7,
                                    color: 'rgba(255, 60, 5, .5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 60, 5, .5)'
                                }]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 60, 5, .1)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 60, 5, .3)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 60, 5, 1)'
                                }]
                            )
                        }
                    }
                }, {
                    // type: 'bar',
                    type: 'line',
                    data: this.dataList2,
                    coordinateSystem: 'polar',
                    name: 'B',
                    stack: 'a',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(10, 255, 175, .5)'
                                }, {
                                    offset: 0.7,
                                    color: 'rgba(10, 255, 175, .5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(10, 255, 175, .5)'
                                }]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(10, 255, 175, .1)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(10, 255, 175, .3)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(10, 255, 175, 1)'
                                }]
                            )
                        }
                    }
                }, {
                    // type: 'bar',
                    type: 'line',
                    data: this.dataList3,
                    coordinateSystem: 'polar',
                    name: 'C',
                    stack: 'a',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(10, 175, 255, .5)'
                                }, {
                                    offset: 0.7,
                                    color: 'rgba(10, 175, 255, .5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(10, 175, 255, .5)'
                                }]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(10, 175, 255, .1)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(10, 175, 255, .3)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(10, 175, 255, 1)'
                                }]
                            )
                        }
                    }
                }],
                legend: {
                    show: true,
                    textStyle: {
                        color: 'rgba(10, 175, 255, .6)',
                    },
                    data: ['A', 'B', 'C']
                }
            })
        }
    },
    watch: {}
}
</script>
<style scoped>

#BrowseIndex {
    width: 400px;
    height: 400px;
}
</style>
