<template>
    <div id="watch">
        <div class="clock-o" v-if="set.sWatch">
            <ul class="hours">
                <li v-for="h in watch.h">{{h}}</li>
            </ul>
            <ul class="minutes">
                <li v-for="m in watch.m">{{m}}</li>
            </ul>
            <ul class="seconds">
                <li v-for="n in 30"></li>
            </ul>
            <i class="line hours" id="hoursLine"></i>
            <i class="line minutes" id="minutesLine"></i>
            <i class="line seconds" id="secondsLine"></i>
            <i class="line spot"></i>
        </div>
        <div :class="['date-o ']+[set.sTime?'time':'']" v-if="set.sDate">
            <span>{{toDay.year}}</span>年<span>{{toDay.month}}</span>月<span>{{toDay.date}}</span>
            <br/> {{days[toDay.day]}}
        </div>
        <div class="time-o" v-if="set.sTime">
            <span>{{toDay.hours}}</span> : <span>{{toDay.minutes}}</span> : <span>{{toDay.seconds}}</span>
        </div>
        <div class="timePanel">
            <a @click="switchTimePanel('sWatch')" class="el-button-default icon" :title="set.sWatch?'关闭时钟':'显示时钟'">
                <i class="fa fa-fw fa-dashboard"></i>
            </a>
            <a @click="switchTimePanel('sDate')" class="el-button-default icon" :title="set.sWatch?'关闭日期':'显示日期'">
                <i class="fa fa-fw fa-calendar"></i>
            </a>
            <a @click="switchTimePanel('sTime')" class="el-button-default icon" :title="set.sWatch?'关闭时间':'显示时间'">
                <i class="fa fa-fw fa-clock-o"></i>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'watch',
    data() {
        return {
            set: {
                sWatch: true,
                sDate: false,
                sTime: false
            },
            watch: {
                h: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                m: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60']
            },
            days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            toDay: {}
        }
    },
    props: {
        user: Object,
        showTime: Boolean,
    },
    mounted() {
        var _t = this;
        this.timer = self.setInterval(function() {
            _t.getToDay();
            if (document.getElementById('hoursLine')) {
                _t.animWatch();
            }
        }, 1000);
    },
    methods: {
        /* 获取时间 */
        getToDay() {
            this.toDay = {
                fullday: new Date(),
                date: new Date().getDate(),
                day: new Date().getDay(),
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            }
        },
        animWatch() {
            var h = (this.toDay.hours + this.toDay.minutes / 60) / 12 * 360;
            var m = (this.toDay.minutes + this.toDay.seconds / 60) / 60 * 360;
            var s = (this.toDay.seconds + new Date().getMilliseconds() / 1000) / 60 * 360;
            document.getElementById('hoursLine').style.transform = "rotate(" + h + "deg)";
            document.getElementById('minutesLine').style.transform = "rotate(" + m + "deg)";
            document.getElementById('secondsLine').style.transform = "rotate(" + s + "deg)";
        },
        /* 切换时间面板 */
        switchTimePanel(_attr) {
            switch (_attr) {
                case 'sWatch':
                    this.set.sDate = false;
                    this.set.sTime = false;
                    break;
                case 'sDate':
                    this.set.sWatch = false;
                    break;
                case 'sTime':
                    this.set.sWatch = false;
                    break;
            }
            if (this.set[_attr] == null) {
                this.set[_attr] = false;
            }
            if (this.set[_attr]) {
                this.set[_attr] = false;
            } else {
                this.set[_attr] = true;
            }
        }
    }
}
</script>
<style scoped>
</style>
