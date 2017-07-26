<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="b in breadcrumb" :key="b.text" :to="b.path">{{b.text}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    name: 'breadcrumb',
    data() {
        return {}
    },
    mounted() {},
    props: {
        breadcrumb: Array
    },
}
</script>
<style scoped>
</style>
