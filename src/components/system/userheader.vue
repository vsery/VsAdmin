<template>
    <div id="userview">
        <div class="header">
            <img :src="user.avatar" alt="">
        </div>
        <div class="number el-button-default">ID&nbsp;<span>{{user.avatarID}}</span></div>
        <div class="desc">
            <span class="name">{{user.nickname}}</span>
            <span class="type" v-if="user.type=='administrator'">管理员</span>
            <span class="type" v-if="user.type=='business'">商家</span>
            <span class="type" v-if="user.type=='anchor'">主播</span>
            <span class="mobile">{{user.mobile}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'userview',
    data() {
        return {

        }
    },
    props: {
        user: Object
    },
    mounted() {},
    methods: {}
}
</script>
<style scoped>
</style>
