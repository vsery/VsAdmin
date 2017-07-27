
## bolds [博客列表页]
# HTML: [DOM结构]
```
    <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
    <!-- 面包屑导航 -->
    ....
    <selectForm-view :user="user" :addUrl="'/bold/bolddesc'" v-on:onSelectForm="getSelectItem"></selectForm-view>
    <!-- 搜素表单 -->
    ....
    <pagination-view ref="ap" v-on:cbData="getItem" :dataUrl="baseUrl + 'bold'" :searchForm="searchForm" :user="user"></pagination-view>
    <!-- 分页 -->
```

# JavaScript: [引用文件]
```
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import selectForm from '@/components/form/selectArticleForm' // 表单/文章搜索
import pagination from '@/components/tool/pagination' // 分页控件
components: {
    "breadcrumb-view": breadcrumb,
    "selectForm-view": selectForm,
    "pagination-view": pagination
}
```

# Data: [数据] 
这里只是定义了空数据, 其实真正请求数据的是分页组件.
把当前页面需要请求数据的接口传给 分页组件. 让分页组件来做请求. 并返回结果.
请求数据接口地址: this.baseUrl + 'bold' , this.baseUrl 为基础常量. 值为: http://localhost:1987/api/
> 在 main.js 中定义的 Vue.prototype.baseUrl = 'http://localhost:1987/api/';

```
data(){
    return {
        bold: [],               // 博客列表 数据
        searchForm: null        // 搜索表单 数据
    }
}
````
