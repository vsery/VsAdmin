import vue from 'vue'
import router from 'vue-router'
import index from '@/components/index' // 系统管理首页
import userheader from '@/components/system/userheader' // 用户头像模块
import userdesc from '@/components/system/userdesc' // 用户信息管理
import wechatsetting from '@/components/system/wechatsetting' // 用户微信设置
import page from '@/components/page/pages' // 页面设置
import blogs from '@/components/blog/blogs' // 博客列表
import blogdesc from '@/components/blog/blogdesc' // 博客列表
import projects from '@/components/project/projects' // 项目列表
import projectdesc from '@/components/project/projectdesc' // 项目详情
import musics from '@/components/music/musics' // 音乐列表
vue.use(router)
export default new router({
	routes: [{
		path: '/',
		name: '首页',
		component: index
	}, {
		path: '/system/userheader',
		name: '用户头像',
		component: userheader
	}, {
		path: '/system/userdesc',
		name: '用户信息',
		component: userdesc
	}, {
		path: '/system/wechatsetting',
		name: '微信设置',
		component: wechatsetting
	}, {
        path: '/page/pages',
        name: '博文列表',
        component: blogs
    }, {
		path: '/blog/blogs',
		name: '博文列表',
		component: blogs
	}, {
		path: '/blog/blogdesc/',
		name: '博文详情',
		component: blogdesc
	}, {
		path: '/project/projects',
		name: '项目列表',
		component: projects
	}, {
		path: '/project/projectdesc',
		name: '项目详情',
		component: projectdesc
	}, {
		path: '/music/musics',
		name: '音乐列表',
		component: musics
	}]
})
