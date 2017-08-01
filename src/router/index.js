import vue from 'vue'
import router from 'vue-router'

import index from '@/components/index' // 系统管理首页

import userheader from '@/components/system/userheader' // 用户头像模块
import userdesc from '@/components/system/userdesc' // 用户信息管理
import wechatsetting from '@/components/system/wechatsetting' // 用户微信设置

import bolds from '@/components/bold/bolds' // 博客列表
import bolddesc from '@/components/bold/bolddesc' // 博客列表
import projects from '@/components/project/projects' // 项目列表
import projectdesc from '@/components/project/projectdesc' // 项目详情

import musics from '@/components/music/musics' // 项目详情
import musicdesc from '@/components/music/musicdesc' // 项目详情

vue.use(router)

export default new router({
    // mode: 'history',
    // hashbang: true,
    // history: false,
    routes: [
        {
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
            path: '/bold/bolds',
            name: '博文列表',
            component: bolds
        }, {
            path: '/bold/bolddesc/',
            name: '博文详情',
            component: bolddesc
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
        }, {
            path: '/music/musicdesc',
            name: '音乐详情',
            component: musicdesc
        }
    ]//,
    // linkActiveClass: ''
})
