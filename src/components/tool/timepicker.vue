<template>
    <el-date-picker v-model="counter" v-on:change="getDate" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions" style="width: 100%;"></el-date-picker>
</template>
<script>
export default {
    name: 'timePicker',
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            counter: ''
        }
    },
    mounted() {},
    methods: {
        /* 获取时间 */
        getDate: function() {
            /* 自定义事件, 传递当前参数 */
            this.$emit('getDateCounter', this.counter);
        }
    }
}
</script>
<style scoped>
</style>
