<template>
  <div id="bold">
    <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
    <selectForm-view :user="user" :addUrl="'/bold/bolddesc'" v-on:onSelectForm="getSelectItem"></selectForm-view>
    <el-collapse accordion class="boldLists">
      <el-collapse-item v-for="bs in bold" :key="bs.id">
        <template slot="title">
          {{bs.title}}
          <router-link class="el-button-default min" :to="{ path: '/bold/bolddesc', query: { id: bs.id }}" :title="['浏览\t']+[bs.title]" :user="user"><i class="header-icon fa fa-fw fa-paper-plane"></i></router-link>
          <span class="time f-right">
						<i class="fa fa-fw fa-fire" v-if="bs.fire" title="热门"></i>
						<i class="fa fa-fw fa-filter" v-if="bs.top" title="顶置"></i>
						{{bs.UpdateTime}}
					</span>
        </template>
        <div class="content">
          <div class="thumbnail text-top">
            <img :src="bs.thumbnail" alt="" class="w-max el-button-default">
          </div>
          <ul class="desc items">
            <li class="w-max">
              <span class="title ellipsis" title="标题">标题: {{bs.title}}</span>
            </li>
            <li class="w-max">
              <span class="key" v-for="k in bs.key" title="关键字">{{k}}</span>
              <div class="f-right">
                <span class="ellipsis" title="点赞数"><i class="fa fa-fw fa-heart"></i>{{bs.zan}}</span>
                <span class="ellipsis" title="浏览数"><i class="fa fa-fw fa-eye"></i>{{bs.eye}}</span>
              </div>
            </li>
            <li class="w-max ">
              <div class="info w-tthird " title="描述">描述: {{bs.desc}}</div>
            </li>
            <!-- <li class="w-max ellipsis"> -->
              <!-- <span class="content" title="内容">内容: ({{decodeURIComponent(bs.content)}}</span> -->
              <!-- <span class="content" title="内容" v-html="'内容:'+decodeURIComponent(bs.content)"></span> -->
            <!-- </li> -->
          </ul>
        </div>
      </el-collapse-item>
    	<div class="prompt" v-if="bold.length==0">暂无数据</div>
    </el-collapse>
    <pagination-view ref="ap" v-on:cbData="getItem" :dataUrl="baseUrl + 'bold'" :searchForm="searchForm" :user="user" :action="'blod'"></pagination-view>
  </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import selectForm from '@/components/form/selectArticleForm' // 表单/文章搜索
import pagination from '@/components/tool/pagination' // 分页控件
export default {
  name: 'bold',
  data() {
    return {
      page: [{
        path: '/',
        text: '首页'
      }, {
        path: '',
        text: this.$route.name
      }],
      bold: [],
      searchForm: null
    }
  },
  props: {
    user: Object
  },
  mounted() {

  },
  methods: {
    /**
     * [getSelectItem 获取搜索表单]
     * @param  {[Object]} _form [ 子组件 >> 返回, 搜索表单内容 ]
     * @return {[Function]}       [ 更新 dom 后,调用 >> 分页组件 -> 获取新数据 ]
     */
    getSelectItem(_form) {
      this.searchForm = _form;
      var that = this;
      this.$nextTick(() => {
        that.$refs.ap.getData(this.searchForm);
      });
    },
    /**
     * [getItem 获取博文列表数据]
     * @param  {[JSON/Array]} _data [ 分页组件 -> 获取新数据 ]
     * @return {[function]}       [ 更新 dom ]
     */
    getItem(_data) {
      this.bold = _data;
      // console.log(this.bold);
    },
    /**
     * [handleChange 手风琴]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    handleChange(val) {
      alert(val);
    }
  },
  components: {
    "breadcrumb-view": breadcrumb,
    "selectForm-view": selectForm,
    "pagination-view": pagination
  }
}

</script>
<style scoped>


</style>
