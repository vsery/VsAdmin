<template>
    <div id="webWeChat">
        <img :src="img" alt="">
        <!-- <iframe src="https://wx2.qq.com/" id="webWeChatFrame" frameborder="0"></iframe> -->
        <!-- <iframe src="https://www.baidu.com/" id="webWeChatFrame" frameborder="0"></iframe> -->
    </div>
</template>
<script>
export default {
    name: 'webWeChat',
    data() {
        return {
            img: 'static/images/other/qrcode.jpg'
        }
    },
    props: {
        user: Object
    },
    mounted() {
    },
    methods: {
    },
    components: {}
}
</script>
<style scoped>
</style>
