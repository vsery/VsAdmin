require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');

// default port where dev server listens for incoming traffic
// 默认的端口，在那里开发服务器监听传入的流量
var port = process.env.PORT || config.dev.port

// automatically open browser, if not set will be false
// 自动打开浏览器，如果未设置将为假
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// Define HTTP proxies to your custom API backend
// 定义HTTP代理到您的自定义API后端
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express();

// for parsing application/x-www-form-urlencoded 用于解析应用程序
app.use(bodyParser.urlencoded({ extended: false }));

// for parsing application/json 用于解析应用程序/ JSON
app.use(bodyParser.json());

var articleTitle = require('../static/database/articleTitle.json'); // 文章标题, 检索列表数据
var articleTitle = articleTitle.articleTitle;
var keyData = require('../static/database/key.json'); // 关键字, 检索列表数据
var keyWord = keyData.keyWord;
var musicData = require('../static/database/music.json'); // 音乐列表
var music = musicData.musicList;
var mapChina = require('../static/database/china.json'); // 中国地图数据
var mapWorld = require('../static/database/world.json'); // 世界地图数据
var eChartsTheme = require('../static/database/eChartsTheme.json'); // eChartsTheme主题包
var apiRoutes = express.Router();

/* 登录方法 */
apiRoutes.post('/signIn', function(req, res) {
    try {
        var fd = fs.openSync('./static/database/admin.json', 'r'),
            tempData = openData(fd);
        for (var i = 0; i < tempData.length; i++) {
            if (tempData[i].type == req.body.params.type &&
                tempData[i].name == req.body.params.name &&
                tempData[i].password == req.body.params.password
            ) return res.send({ state: 'SUCCESS', data: tempData[i] });
        }
        return res.send({ state: 'ERROR', info: '您输入的账户或密码错误!' });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

/* 注册方法 */
apiRoutes.post('/signUp', function(req, res) {
    try {
        var fd = fs.openSync('./static/database/admin.json', 'r+'),
            tempData = openData(fd),
            tempID = 2001;
        for (var i = 0; i < tempData.length; i++) {
            if (tempID < tempData[i].avatarID) tempID = tempData[i].avatarID;
        }
        var signUpUserObj = req.body.params;
        signUpUserObj.avatarID = tempID + 1;
        signUpUserObj.token = generateToken;
        tempData.splice(0, 0, signUpUserObj);
        var newData = JSON.stringify(tempData);
        fs.writeFile(fd, newData, function(err) {
            if (err) return res.send({ state: 'ERROR', info: '添加失败,请联系管理员!' });
            return res.send({ state: 'SUCCESS', data: signUpUserObj, info: '添加成功,赶紧操作吧!' });
        });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

// ueditor后端配置项, 主要以图片为主
apiRoutes.get('/upFile', function(req, res) {
    res.json({
        "imageActionName": "uploadimage",
        "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
        "imageFieldName": "file",
        "imageMaxSize": 2048000,
        "imagePathFormat": "",
        "imageUrlPrefix": uri + "/",
        "videoActionName": "uploadvideo",
        "videoFieldName": "file",
        "videoPathFormat": "",
        "videoUrlPrefix": uri + "/",
        "videoMaxSize": 102400000,
        "videoAllowFiles": [
            ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
            ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"
        ]
    });
});

/* 设置图像上传配置 */
var storageUpFile = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'static/uploads/')
    },
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '_' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({ storage: storageUpFile });
/**
 * 上传文件接口
 * @req.query.action          [提交过来的类型]
 * @param  {[req.file]}       [提交过来的文件内容]
 * @param  {[res]}       [返回浏览器内容]
 * @desc  同步打开JSON文件, 异步写入数据!
 * @return {[state]}       [状态码]
 */
apiRoutes.post('/upFile', upload.single('file'), function(req, res, next) {
    if (!req.file) return res.json({ state: 'ERROR', info: '上传失败,请联系管理员!' });
    var fd;
    switch (req.query.action) {
        case 'uploadimage':
            fd = fs.openSync('./static/database/upIamge.json', 'r+');
            break;
        case 'uploadvideo':
            fd = fs.openSync('./static/database/upVideo.json', 'r+');
            break;
        case 'uploadmusic':
            fd = fs.openSync('./static/database/upMusic.json', 'r+');
            break;
    }
    try {
        var tempData = openData(fd),
            tempID = 0,
            tempFile;
        for (var i = 0; i < tempData.length; i++) {
            if (tempID < tempData[i].id) tempID = tempData[i].id;
        }
        tempFile = req.file;
        tempFile.id = tempID + 1;
        tempData.splice(0, 0, tempFile);
        var newData = JSON.stringify(tempData);
        fs.writeFile(fd, newData, function(err) {
            if (err) return res.send({ state: 'ERROR', info: '上传失败,请联系管理员!' });
            return res.json({
                state: 'SUCCESS',
                url: req.file.path,
                title: req.file.originalname,
                original: req.file.originalname,
                data: req.file.path,
                info: '上传成功'
            });
        });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

// 系统数据集合
var appData = require('../static/database/db.json');

// 系统菜单
var menu = appData.menu;
apiRoutes.get('/menu', function(req, res) {
    res.json(menu);
});

// 平台设置菜单
var systemMenu = appData.systemMenu;
apiRoutes.get('/systemMenu', function(req, res) {
    res.json(systemMenu);
});

/**
 * [博客列表 叔据]
 * @param  {[type]} req     [参数]
 * @param  {[type]} res)    { if (boldListData.length == 0 [ JSON/数据库 中没有数据 ]
 * @param  {Array}  newData [ 匹配条件后的新数据 ]
 * @param  {Array}  current [ 分页后, 当前数据 ]
 * @return {[type]}         [ 返回 数据 ]
 */
apiRoutes.get('/bold', function(req, res) {
    try {
        var fd = fs.openSync('./static/database/bold.json', 'r+'),
            tempData = openData(fd),
            newData = [],
            current = [];
        for (var i = 0; i < tempData.length; i++) {
            if (req.query.searchForm == null || req.query.searchForm == '' || req.query.searchForm == undefined) {
                newData.push(tempData[i]);
            } else {
                var searchForm = JSON.parse(req.query.searchForm);
                if (!searchForm.senior) {
                    if (tempData[i].title.indexOf(searchForm.title) >= 0) newData.push(tempData[i]);
                } else {
                    var temp = true;
                    if (searchForm.title != '' && tempData[i].title.indexOf(searchForm.title) < 0) temp = false;
                    if (searchForm.key != '' && tempData[i].key.indexOf(searchForm.key) < 0) temp = false;
                    if (searchForm.date.length != 0 && (new Date(tempData[i].UpdateTime) <= new Date(searchForm.date[0]) || new Date(tempData[i].UpdateTime) >= new Date(searchForm.date[1]))) temp = false;
                    if (searchForm.type.length == 1) {
                        if (searchForm.type[0] == '顶置' && !tempData[i].top) temp = false;
                        if ((searchForm.type[0] == '热评' || searchForm.type[1] == '热评') && !tempData[i].fire) temp = false;
                    } else if (searchForm.type.length == 2) {
                        if (!tempData[i].top || !tempData[i].fire) temp = false;
                    }
                    if (temp) newData.push(tempData[i]);
                }
            }
        }
        for (var i = (req.query.page - 1) * req.query.size; i < req.query.page * req.query.size && i < newData.length; i++) {
            current.push(newData[i]);
        }
        return res.json({ state: 'SUCCESS', data: current, total: newData.length });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

/**
 * [获取博文]
 * @param  {[type]} req  [ 提交params ]
 * @param  {[type]} res) [ 匹配返回博文 ]
 * @return {[type]}      [ 不匹配返回提示信息 ]
 */
apiRoutes.get('/boldID', function(req, res) {
    try {
        var fd = fs.openSync('./static/database/bold.json', 'r+');
        var tempData = openData(fd);
        for (var i = 0; i < tempData.length; i++) {
            if (req.query.boldID == tempData[i].id) {
                var _callback = tempData[i];
                (i == 0 ? _callback.prevID = -1 : _callback.prevID = tempData[i - 1].id);
                (i == (tempData.length - 1) ? _callback.nextID = -1 : _callback.nextID = tempData[i + 1].id);
                return res.json({ state: 'SUCCESS', data: _callback });
            }
        }
        return res.json({ state: 'ERROR', info: '寻找的博文丢失了,请联系管理员.' });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

/**
 * [添加/编辑博文]
 * @param  {[type]} req  [ 提交参数 ]
 * @param  {[type]} res 
 * @return {[type]}      [ 返回状态,并提示信息 ]
 */
apiRoutes.post('/boldID', function(req, res) {
    try {
        var fd = fs.openSync('./static/database/bold.json', 'r+');
        var tempData = openData(fd);
        if (req.body.params.bold.id == -1) {
            req.body.params.bold.NewTime = req.body.params.bold.UpdateTime;
            if (tempData.length == 0) {
                req.body.params.bold.id = 1
            } else {
                req.body.params.bold.id = tempData[0].id + 1;
            }
            tempData.unshift(req.body.params.bold);
        } else {
            for (var i = 0; i < tempData.length; i++) {
                if (req.body.params.bold.id == tempData[i].id) tempData.splice(i, 1, req.body.params.bold);
            }
        }
        var newData = JSON.stringify(tempData);
        fs.writeFile(fd, newData, function(err) {
            if (err) {
                return res.send({ state: 'ERROR', info: '编辑失败,请联系管理员!' });
            }
            return res.json({ state: 'SUCCESS', info: '提交成功', data: { id: req.body.params.bold.id } });
        });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

// 项目列表数据
apiRoutes.get('/project', function(req, res) {
    try {
        var fd = fs.openSync('./static/database/project.json', 'r+'),
            tempData = openData(fd),
            newData = [],
            current = [];
        for (var i = 0; i < tempData.length; i++) {
            if (req.query.searchForm == null || req.query.searchForm == '' || req.query.searchForm == undefined) {
                newData.push(tempData[i]);
            } else {
                var searchForm = JSON.parse(req.query.searchForm);
                if (!searchForm.senior) {
                    if (tempData[i].title.indexOf(searchForm.title) >= 0) newData.push(tempData[i]);
                } else {
                    var temp = true;
                    if (searchForm.title != '' && tempData[i].title.indexOf(searchForm.title) < 0) temp = false;
                    if (searchForm.key != '' && tempData[i].key.indexOf(searchForm.key) < 0) temp = false;
                    if (searchForm.date.length != 0 && (new Date(tempData[i].UpdateTime) <= new Date(searchForm.date[0]) || new Date(tempData[i].UpdateTime) >= new Date(searchForm.date[1]))) temp = false;
                    if (searchForm.type.length == 1) {
                        if (searchForm.type[0] == '顶置' && !tempData[i].top) temp = false;
                        if ((searchForm.type[0] == '热评' || searchForm.type[1] == '热评') && !tempData[i].fire) temp = false;
                    } else if (searchForm.type.length == 2) {
                        if (!tempData[i].top || !tempData[i].fire) temp = false;
                    }
                    if (temp) newData.push(tempData[i]);
                }
            }
        }
        for (var i = (req.query.page - 1) * req.query.size; i < req.query.page * req.query.size && i < newData.length; i++) {
            current.push(newData[i]);
        }
        return res.json({ state: 'SUCCESS', data: current, total: newData.length });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

apiRoutes.get('/music', function(req, res) {
    // res.json({ state: "SUCCESS", data: music, total: music.length });
    try {
        var fd = fs.openSync('./static/database/music.json', 'r+'),
            tempData = openData(fd),
            newData = [],
            current = [];
        for (var i = 0; i < tempData.length; i++) {
            if (req.query.searchForm == null || req.query.searchForm == '' || req.query.searchForm == undefined) {
                newData.push(tempData[i]);
            } else {
                var searchForm = JSON.parse(req.query.searchForm);
                if (!searchForm.senior) {
                    if (tempData[i].title.indexOf(searchForm.title) >= 0) newData.push(tempData[i]);
                } else {
                    var temp = true;
                    if (searchForm.title != '' && tempData[i].title.indexOf(searchForm.title) < 0) temp = false;
                    if (searchForm.key != '' && tempData[i].key.indexOf(searchForm.key) < 0) temp = false;
                    if (searchForm.date.length != 0 && (new Date(tempData[i].UpdateTime) <= new Date(searchForm.date[0]) || new Date(tempData[i].UpdateTime) >= new Date(searchForm.date[1]))) temp = false;
                    if (searchForm.type.length == 1) {
                        if (searchForm.type[0] == '顶置' && !tempData[i].top) temp = false;
                        if ((searchForm.type[0] == '热评' || searchForm.type[1] == '热评') && !tempData[i].fire) temp = false;
                    } else if (searchForm.type.length == 2) {
                        if (!tempData[i].top || !tempData[i].fire) temp = false;
                    }
                    if (temp) newData.push(tempData[i]);
                }
            }
        }
        for (var i = (req.query.page - 1) * req.query.size; i < req.query.page * req.query.size && i < newData.length; i++) {
            current.push(newData[i]);
        }
        return res.json({ state: 'SUCCESS', data: current, total: newData.length });
    } catch (err) {
        console.log("错误日志: " + err.name + "\n", err.message);
    } finally {
        fs.close(fd);
    }
});

apiRoutes.get('/articleTitle', function(req, res) {
    res.json(articleTitle);
});

apiRoutes.get('/keyWord', function(req, res) {
    res.json(keyWord);
});

apiRoutes.get('/china', function(req, res) {
    res.json(mapChina);
});

apiRoutes.get('/world', function(req, res) {
    res.json(mapWorld);
});

apiRoutes.get('/eChartsTheme', function(req, res) {
    res.json(eChartsTheme);
});

// 统一 API 路由
app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '/\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}

// 打开文件,并判断是否为unll,且返回数据
function openData(fd) {
    var data = fs.readFileSync(fd, "utf8"),
        tempData;
    console.log(data.toString());
    if (data.toString() == "[]" || data.toString() == null || data.toString() == "") {
        tempData = [];
    } else {
        tempData = JSON.parse(data.toString());
    }
    console.log(tempData);
    return tempData;
}

// 60位所及token
var generateToken = function(_length) {
    var length = 60,
        string = "abcdefghijklmnopqrstuvwxyz",
        strUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numeric = '0123456789',
        punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=',
        token = "";
    if (_length) length = _length;
    while (token.length < length) {
        entity1 = Math.ceil(string.length * Math.random() * Math.random());
        entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        entity4 = Math.ceil(strUpper.length * Math.random() * Math.random());
        if (token.length < length) {
            token += string.charAt(entity1);
            token += strUpper.charAt(entity4);
            token += numeric.charAt(entity2);
            token += punctuation.charAt(entity3);
        }
    }
    return token;
}()
