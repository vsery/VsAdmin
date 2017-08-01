<template>
    <el-row class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="ap.pager" :page-sizes="ap.sizes" :page-size="ap.size" layout="total, sizes, prev, pager, next, jumper" :total="ap.total">
        </el-pagination>
    </el-row>
</template>
<script>
export default {
    name: 'pagination',
    data() {
        return {
            data: [],
            ap: {
                prev: '',
                pager: 1,
                next: '',
                size: 10,
                total: 500,
                sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            }
        }
    },
    props: {
        dataUrl: String,
        action: String,
        searchForm: Object,
        user: Object
    },
    mounted() {
        // 得到 api 地址
        // console.log('>> 获取数据的api地址\tdataUrl:'+this.dataUrl);
        this.getData();
    },
    methods: {
        /**
         * [getData 获取数据]
         * @return cbData {[JSON/Arrry]} [ 返回数据 => callback ]
         */
        getData() {
            // 得到搜索表单
            // console.log(this.searchForm);
            if (this.searchForm != null) {
                var params = {
                    'token': this.user.token,
                    'page': this.ap.pager,
                    'size': this.ap.size,
                    'searchForm': this.searchForm
                }
            } else {
                var params = {
                    'token': this.user.token,
                    'page': this.ap.pager,
                    'size': this.ap.size
                }
            }
            // 得到参数
            // console.log(params);
            this.$http.get(this.dataUrl, {
                params: params
            }).then(res => {
                var resData = res.data;
                console.log(resData);
                console.log(this.action);
                this.ap.total = resData.total;
                var callback = [];
                for (var i = 0; i < resData.data.length; i++) {
                    switch (this.action) {
                        case 'blod':
                            if (resData.data[i].avathorID == this.user.avathorID) {
                                callback.push(resData.data[i]);
                            }
                            break;
                        case 'music':
                            callback.push(resData.data[i]);
                            break;
                    }
                }
                this.$emit('cbData', callback);
                // console.log(callback);
            });
        },
        /* 每页显示几条数据 */
        handleSizeChange(val) {
            this.ap.size = val;
            this.getData();
        },
        /* 分页跳转 */
        handleCurrentChange(val) {
            this.ap.pager = val;
            this.getData();
        }
    }
}

</script>
<style scoped>


</style>
