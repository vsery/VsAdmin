<template>
    <ul id="menubox">
        <li>
            <a title="菜单" @click="layout" class="el-button-default">
                <i class="fa fa-fw fa-bars"></i><span>菜单</span>
            </a>
        </li>
        <li v-for="m, key, index in menus">
            <!-- <a :class="['el-button-default ']+[key%2==0&&!setLayout?'right':'']" :href="m.path" :title="m.text">
                <i :class="'fa fa-fw fa-'+[m.icon]"></i><span>{{m.text}}</span>
            </a> -->
            <router-link :to="{ path: m.path }" :class="['el-button-default ']+[key%2==0&&!setLayout?'right':'']" :title="m.text">
                <i :class="'fa fa-fw fa-'+[m.icon]"></i>
                <span>{{m.text}}</span>
            </router-link>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'menubox',
    data() {
        return {
            setLayout: false,
            menuUrl: '',
            menus: [],
            sysmenus: []
        }
    },
    props: {
        user: Object
    },
    mounted() {
        this.getMenu();
    },
    methods: {
        getMenu() {
            this.menuUrl = this.baseUrl + 'menu';
            var params = {
                'token': this.user.token
            }
            this.$http.get(this.menuUrl, {
                params: params
            }).then(res => {
                var resData = res.data;
                this.menus = resData;
            });
        },
        layout() {
            if (this.setLayout) {
                this.setLayout = false;
            } else {
                this.setLayout = true;
            }
            this.$emit('setLayout', this.setLayout);
        }
    }
}
</script>
<style scoped>
</style>
