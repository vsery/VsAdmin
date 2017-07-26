<template>
    <div id="app">
        <div class="web-menu">
            <ul class="right">
                <li v-for="wm in webMenu" :key="wm.name">
                    <a :href="wm.path" :title="wm.name">{{wm.name}}
                    </a>
                </li>
            </ul>
        </div>
        <div class="web-container-box">
            <index-view></index-view>
        </div>
        <div class="bg-box">
            <!-- <iframe :src="bg"></iframe> -->
        </div>
    </div>
</template>
<script>
import index from '@/components/index'
export default {
    name: 'app',
    data() {
        return {
            bg: '/static/pages/background/backgroundPage_' + parseInt(Math.random() * 5) + '.html',
            webMenu: [{
                path: '#/',
                name: '首页'
            }, {
                path: '#/bold/bolds',
                name: '博文列表',
            }, {
                path: '#/bold/bolddesc',
                name: '博文详情',
            }, {
                path: '#/project/projects',
                name: '项目列表',
            }, {
                path: '#/project/projectdesc',
                name: '项目详情',
            }, {
                path: '#/bold/bolds',
                name: '博文列表',
            }, {
                path: '#/admin/admin',
                name: '后台管理'
            }]
        }
    },
    components: {
        'index-view': index
    },
    mounted() {
        this.setHeader();
    },
    methods: {
        /* 设置页面头 */
        setHeader() {
            var link = document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "icon";
            link.href = 'static/favicon/favicon' + parseInt(Math.random() * 4) + '.ico';
            document.getElementsByTagName("head")[0].appendChild(link);
            this.bg = '/static/pages/background/backgroundPage_3.html';
        }
    },
    watch: {}
}
</script>
<style>
</style>
