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
```


## bolddesc [博客详情页]

# HTML: [DOM结构]
```
    <upFile-view v-on:onImageUrl="getImgUrl" :imgParam="imgParam" :dialogImageUrl="bold.thumbnail"></upFile-view>
    <!-- 上传 -->
    ....
    <editorBox-view :value="bold.content" v-on:input="getEditor" v-on:ready="newEditor"></editorBox-view>
    <!-- 编辑器 -->
```

# JavaScript: [引用文件]P
```
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import upFile from '@/components/tool/upFile' // 上传图片组件
import editorBox from '@/components/tool/editor' // editor组件
components: {
    "breadcrumb-view": breadcrumb,
    "upFile-view": upFile,
    'editorBox-view': editorBox
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
        edit: false,            // 是否为编辑状态
        bold: {},               // 博文数据.根据 this.bold.id 展示数据, 值为 -1 时,添加新的博文.
        imgParam: {             // 图片上传零时变量, 最终值赋给 this.bold.thumbnail
            header: true        // 此属性,告诉上传组件, 是否为头像.还有一起其他值,这里不要用,就没有一一列出
        },
        editorBox: null,        // 给编辑器,定义个盒子[指针]
        editor: null            // 编辑器属性, 最终值赋给 this.bold.content
    }
}
``` 
