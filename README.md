## VsAdmin
# Vsery

# 灵感

> 首先自我介绍下吧，我是一个Web前端程序员，一个刚刚干了几年左右的小菜鸟。这只是我写给自己的一个可以博客!用于练手的, 如果喜欢请 Star. 写的好辛苦,请不要 Fork.  采用 Vue + node + echarts + element-ui + axios + body-parser + multer + vue-router + ueditor ...技术来实现的. 后台部分,暂时采用JSON, 并没有链接数据库.   中间穿插了自己写的几个小插件. 如时钟, 音乐播放器....

## Build Setup

``` bash
# install gdependencies
npm install

# install body-parser
npm install body-parser --save

# install echarts
npm install echarts --save

# install element-ui
npm install element-ui --save

# install multer
$ npm install --save multer

# serve with hot reload at localhost:1987
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 效果如下图

登录效果图
![image](https://github.com/vsery/VsAdmin/raw/master/static/login.png)

博客效果图
![image](https://github.com/vsery/VsAdmin/raw/master/static/bold.png)

产品效果图
![image](https://github.com/vsery/VsAdmin/raw/master/static/project.png)

# icon desc [图标字体查询]
static fonts fonts.html

# animate desc [动画查询]
static css animate.html

# element-ul [桌面端组件库]
一套基于 Vue 2.0 的桌面端组件库 - V2EX [element](http://element.eleme.io/#/zh-CN/component/layout)

# ueditor [编辑器]
[UEditor](http://fex.baidu.com/ueditor/)是由百度web前端研发部开发所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点，开源基于MIT协议，允许自由使用和修改代码...有[前端配置](http://fex.baidu.com/ueditor/#start-config), [后端配置](http://fex.baidu.com/ueditor/#server-deploy)文档

# echarts [数据分析]
官方提供一些[文档](http://echarts.baidu.com/tutorial.html), [常见问题](http://echarts.baidu.com/faq.html), 和 [实例](http://echarts.baidu.com/examples.html)


# multer [ node 中间键]
Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据, 它主要用于上传文件. 它是写在 busboy 之上非常高效。[文档](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)

# body-parser
Node.js body parsing middleware.
Parse incoming request bodies in a middleware before your handlers, available under the req.body property. checkout the [guide](https://www.npmjs.com/package/body-parserg)

## GIt常用命令
…or create a new repository on the command line
```
echo "# VsAdmin" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/vsery/VsAdmin.git
git push -u origin master
```

…or push an existing repository from the command line
```
git remote add origin https://github.com/vsery/VsAdmin.git
git push -u origin master
```

git…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.