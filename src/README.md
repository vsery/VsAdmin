## 目录
```
此文件夹, 用来存放自定义组件/板块, 板块之间存在相互调用. 相互之间监听/共享父组件参数.通过自定义参数! 
    1: 父组件 => 子组件. [父传子, 自定值使用 props 接收]
    如: 
    <pagination-view :dataUrl="baseUrl + 'bold'" :searchForm="searchForm" :user="user"></pagination-view>
    ---------------------------------------------------------- 父组件

    props: {
        dataUrl: String,
        searchForm: Object,
        user: Object
    }
    ---------------------------------------------------------- 子组件

    2: 子组件 => 父组件. [子传父, 自定义方法 cdDate 接收]
    如:
    this.$emit('cbData', callback);
    ---------------------------------------------------------- 子组件

    <pagination-view v-on:cbData="getItem"></pagination-view>
    ...
    getItem(_data) {
        this.bold = _data;
        // console.log(this.bold);
    }
    ---------------------------------------------------------- 父组件

```
例如: [博客列表页](https://github.com/vsery/VsAdmin/blob/master/src/components/bold/bolds.vue) 就调用了 [搜索表单](https://github.com/vsery/VsAdmin/blob/master/src/components/form/selectform.vue) , [分页](https://github.com/vsery/VsAdmin/blob/master/src/components/tool/pagination.vue) . 


# components [组件] 
=================================================================
----文件夹---------文件名[组件名]----------------作用[功能描述]
    bold/                                       博客
                bolds.vue                       博客列表
                bolddesc.vue                    博客详情/添加/编辑博客
    eCharts/                                    数据图表
    form/                                       表单
                selectform.vue                  搜索表单
    project/                                    项目
                projects.vue                    项目列表
                projectdesc.vue                 项目详情
    system/                                     系统板块
                menubox.vue                     菜单[左侧]
                systemmenu.vue                  工具[右侧]
                userheader.vue                  个人头像[右侧顶部]
    tool/                                       工具组件
                breadcrumb.vue                  面包屑
                editor.vue                      编辑器
                music.vue                       音乐播放器
                pagination.vue                  分页
                qq.vue                          WebQQ
                time.vue                        时钟面板
                timePicker.vue                  时间面板P
                upFile.vue                      上传
                wechat.vue                      WeChat
    index.vue                                   后台首页
    layout.vue                                  布局板块

# router [路由]
    index.js                                    后台网站路由

# App.vue [后台主页]
    登录/注册/ --->个性化背景                       

# main.js
    前端部分, 主函数, 以及加载 一些必要的文件/插件/样式...





