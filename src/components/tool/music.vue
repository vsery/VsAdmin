<template>
    <div id="systemMusic">
        <div class="visualization">
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
                <div class="anmie" v-if="music.anime">
                    <div class="show" @click="musicPlay">
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                    </div>
                </div>
            </transition>
            <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp" mode="out-in">
                <div class="cover" v-if="music.cover">
                    <div :class="['musicImg ']+[music.play?'play':'play paused']">
                        <img :src="music.currentMusic.cover" alt="">
                    </div>
                </div>
            </transition>
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
                <div class="anmie" v-if="music.anime">
                    <div class="show" @click="musicPlay">
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                        <span :class="['line ']+[music.play?'':'paused']"></span>
                    </div>
                </div>
            </transition>
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
                <ul class="musicList" v-if="music.listshow">
                    <li v-for="m in musicList" :class="['ellipsis ']+[music.currentMusic.id == m.id?'active':'']" @click="switchMusic(m.id)">{{m.title}}</li>
                </ul>
            </transition>
        </div>
        <div class="panel">
            <a @click='musicPrev' class="el-button-default icon" title="上一曲">
                <i class="fa fa-fw fa-fast-backward"></i>
            </a>
            <a @click='musicPlay' class="el-button-default icon" :title="music.play?'暂停':'播放'">
                <i :class="['fa fa-fw fa-']+[music.play?'pause':'play']"></i>
            </a>
            <a @click='musicNext' class="el-button-default icon" title="下一曲">
                <i class="fa fa-fw fa-fast-forward"></i>
            </a>
            <a @click='musicCover' class="el-button-default icon" :title="music.cover?'关闭封面':'查看封面'">
                <i class="fa fa-fw fa-image"></i>
            </a>
            <a @click='musicAnime' class="el-button-default icon" :title="music.anime?'关闭音轨':'查看音轨'">
                <i class="fa fa-fw fa-tasks"></i>
            </a>
            <a @click='musicSwitchList' class="el-button-default icon" :title="music.listshow?'关闭列表':'打开列表'">
                <i class="fa fa-fw fa-list"></i>
            </a>
            <a @click='musicSwitchType' class="el-button-default icon" :title="music.type.title">
                <i :class="['fa fa-fw fa-']+[music.type.icon]"></i>
            </a>
        </div>
        <audio preload id="audioMusic" :title="music.currentMusic.title">
            <source :src="music.currentMusic.src" type="audio/ogg">
            <source :src="music.currentMusic.src" type="audio/mpeg">
        </audio>
    </div>
</template>
<script>
export default {
    name: 'systemMusic',
    data() {
        return {
            audio: null,
            music: {
                flag: true,
                play: false,
                operation: 'prev',
                type: {
                    title: '',
                    class: '',
                    icon: ''
                },
                cover: true,
                anime: true,
                listshow: false,
                currentMusic: {
                    id: '',
                    title: '',
                    src: '',
                    cover: '',
                    time: ''
                },
            },
            musicList: [],
            type: [{
                title: '列表循环',
                class: 'list',
                icon: 'list-ol'
            }, {
                title: '随机播放',
                class: 'random',
                icon: 'random'
            }, {
                title: '单曲播放',
                class: 'repeat',
                icon: 'repeat'
            }]
        }
    },
    props: {
        user: Object
    },
    mounted() {
        this.getMusciList();
    },
    methods: {
        /* 获取音乐列表 */
        getMusciList() {
            this.menuUrl = this.baseUrl + 'music';
            var params = {
                'token': this.user.token
            }
            this.$http.get(this.menuUrl, {
                params: params
            }).then(res => {
                var resData = res.data;
                this.musicList = resData.data;
                this.audio = document.getElementById('audioMusic');
                this.music.type = this.type[0];
                this.musicRandom();
                this.palyGoOn();
            });
        },
        /* 播放模式 */
        palyType(_type) {
            switch (_type) {
                case 'list':
                    this.musicNext();
                    break;
                case 'random':
                    this.musicRandom();
                    break;
                case 'repeat':
                    this.musicPlay();
                    break;
            }
        },
        /* 继续播放 */
        palyGoOn() {
            var _t = this;
            this.audio.addEventListener('ended', function() {
                _t.palyType(_t.music.type.class);
            });
        },
        /* 随机音乐 */
        musicRandom() {
            this.music.currentMusic = this.musicList[parseInt(Math.random() * this.musicList.length)];
            this.musicPlay();
        },
        /* 切歌 */
        switchMusic(_index) {
            for (var i = 0; i < this.musicList.length; i++) {
                if (_index == this.music.currentMusic.id) {
                    break;
                }
                if (_index == this.musicList[i].id) {
                    this.music.currentMusic = this.musicList[i];
                    break;
                }
            }
            this.musicPlay();
        },
        /* 播放音乐 */
        musicPlay() {
            if (this.music.flag) {
                this.music.flag = false;
                if (this.audio.title != this.music.currentMusic.title) {
                    this.audio.src = this.music.currentMusic.src;
                }
                if (this.audio.paused) {
                    this.audio.play();
                    this.music.play = true;
                } else {
                    this.audio.pause();
                    this.music.play = false;
                }
                this.music.flag = true;
            }
        },
        /* 上一曲 */
        musicPrev() {
            if (this.music.type.class == 'random') {
                this.palyType('random');
                return;
            }
            for (var i = 0; i < this.musicList.length; i++) {
                if (this.music.currentMusic.id == this.musicList[i].id) {
                    if (this.music.operation == 'prev') {
                        this.music.operation = 'prev';
                        if (i == 0) {
                            this.music.currentMusic = this.musicList[this.musicList.length - 1];
                            break
                        }
                        this.music.currentMusic = this.musicList[i - 1];
                        break;
                    } else {
                        if (i == this.musicList.length - 1) {
                            this.music.currentMusic = this.musicList[0];
                            break
                        }
                        this.music.currentMusic = this.musicList[i + 1];
                        break;
                    }
                }
            }
            this.musicPlay();
        },
        /* 下一曲 */
        musicNext() {
            if (this.music.type.class == 'random') {
                this.palyType('random');
                return;
            }
            this.music.operation = 'next';
            this.musicPrev();
        },
        /* 封面显示切换 */
        musicCover() {
            if (this.music.cover) {
                this.music.cover = false;
            } else {
                this.music.cover = true;
                this.music.listshow = false;
            }
        },
        /* 音轨显示切换 */
        musicAnime() {
            if (this.music.anime) {
                this.music.anime = false;
            } else {
                this.music.anime = true;
                this.music.listshow = false;
            }
        },
        /* 切换播放模式 */
        musicSwitchType() {
            for (var i = 0; i < this.type.length; i++) {
                if (this.music.type.title == this.type[i].title) {
                    if (i == this.type.length - 1) {
                        this.music.type = this.type[0];
                        break;
                    }
                    this.music.type = this.type[i + 1];
                    break;
                }
            }
        },
        /* 音乐列表 */
        musicSwitchList() {
            if (this.music.listshow) {
                this.music.listshow = false;
            } else {
                this.music.listshow = true;
                this.music.cover = false;
                this.music.anime = false;
            }
        }
    }
}
</script>
<style scoped>
</style>
