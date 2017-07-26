require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn             = require('opn')
var path            = require('path')
var express         = require('express');
var webpack         = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig   = require('./webpack.dev.conf');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var fs              = require('fs');

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

var articleTitle = require('../static/database/articleTitle.json');         // 文章标题, 检索列表数据
var articleTitle = articleTitle.articleTitle;
var keyData      = require('../static/database/key.json');                  // 关键字, 检索列表数据
var keyWord      = keyData.keyWord;
var musicData    = require('../static/database/music.json');                // 音乐列表
var music        = musicData.musicList;
var mapChina     = require('../static/database/china.json');                // 中国地图数据
var mapWorld     = require('../static/database/world.json');                // 世界地图数据
var eChartsTheme = require('../static/database/eChartsTheme.json');         // eChartsTheme主题包
var apiRoutes    = express.Router();

/* 登录方法 */
apiRoutes.post('/signIn', function(req, res) {
    fs.readFile('./static/database/admin.json', function(err, data) {
        if (err) {
            return res.send({ state: 'ERROR', info: '读取数据文件失败' });
        }
        var arr = JSON.parse(data.toString());
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == req.body.params.type && arr[i].name == req.body.params.name && arr[i].password == req.body.params.password) {
                return res.send({ state: 'SUCCESS', data: arr[i] });
            }
        }
        return res.send({ state: 'ERROR', info: '您输入的账户或密码错误!' });
    });
});

/* 注册方法 */
apiRoutes.post('/signUp', function(req, res) {
    var file = './static/database/admin.json';
    var fd = fs.openSync(file, 'r+');
    var data = fs.readFileSync(fd, "utf8"),
        tempArr,
        tempID = 2001;
    (data.toString() == "[]" || data.toString() == null || data.toString() == "" ? tempArr = [] : tempArr = JSON.parse(data.toString()));
    for (var i = 0; i < tempArr.length; i++) {
        if (tempID < tempArr[i].avatarID) tempID = tempArr[i].avatarID;
    }
    var uobj = req.body.params;
    uobj.avatarID = tempID;
    uobj.token = generateToken;
    tempArr.splice(0, 0, uobj);
    var newData = JSON.stringify(tempArr);
    fs.writeFile(fd, newData, function(err) {
        if (err) {
            return res.send({ state: 'ERROR', info: '添加失败,请联系管理员!' });
        }
        return res.send({ state: 'SUCCESS', data: uobj, info: '添加成功,赶紧操作吧!' });
        fs.close(fd);
    });
});

/* 设置图像上传配置 */
var storageUpImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'static/images/uploads/')
    },
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '_' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

// ueditor后端配置项, 主要以图片为主
apiRoutes.get('/upFile', function(req, res) {
    res.json({
        "imageActionName": "upimage",
        "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
        "imageFieldName" : "upimage",
        "imageMaxSize"   : 2048000,
        "imagePathFormat": "",
        "imageUrlPrefix" : uri + "/",
        "imageFieldName" : "image"
    });
});

var upload = multer({ storage: storageUpImg });
/**
 * 上传文件接口
 * @req.query.action          [提交过来的类型]
 * @param  {[req.file]}       [提交过来的文件内容]
 * @param  {[res]}       [返回浏览器内容]
 * @desc  同步打开JSON文件, 异步写入数据!
 * @return {[state]}       [状态码]
 */
apiRoutes.post('/upFile', upload.single('image'), function(req, res, next) {
    console.log(req.query.action);
    console.log(req.file);
    if (req.file && req.query.action == 'upimage') {
        var fd = fs.openSync('./static/database/upImg.json', 'r+');
        var data = fs.readFileSync(fd, "utf8"),
            tempArr,
            tempID = 0;
        (data.toString() == "[]" || data.toString() == null || data.toString() == "" ? tempArr = [] : tempArr = JSON.parse(data.toString()));
        for (var i = 0; i < tempArr.length; i++) {
            if (tempID < tempArr[i].id) tempID = tempArr[i].id;
        }
        tempID++;
        var tempImg = {
            id  : tempID,
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
            path: req.file.path
        }
        tempArr.splice(0, 0, tempImg);
        var newData = JSON.stringify(tempArr);
        fs.writeFile(fd, newData, function(err) {
            if (err) {
                return res.send({ state: 'ERROR', info: '上传失败,请联系管理员!' });
            }
            return res.json({
                state   : 'SUCCESS',
                url     : req.file.path,
                title   : req.file.originalname,
                original: req.file.originalname,
                data    : req.file.path,
                info    : '上传成功'
            });
            fs.close(fd);
        });
    } else {
        return res.json({ state: 'ERROR', info: '上传失败,请联系管理员!' });
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
    var fboldlist = fs.openSync('./static/database/bold.json', 'r+');
    var data = fs.readFileSync(fboldlist, "utf8"),
        boldListData;
    (data.toString() == "[]" || data.toString() == null || data.toString() == "" ? boldListData = [] : boldListData = JSON.parse(data.toString()));
    var newData = [],
        current = [];
    for (var i = 0; i < boldListData.length; i++) {
        if (req.query.searchForm == null || req.query.searchForm == '' || req.query.searchForm == undefined) {
            newData.push(boldListData[i]);
        } else {
            var searchForm = JSON.parse(req.query.searchForm);
            if (!searchForm.senior) {
                if (boldListData[i].title.indexOf(searchForm.title) >= 0) {
                    newData.push(boldListData[i]);
                }
            } else {
                var temp = true;
                if (searchForm.title != '' && boldListData[i].title.indexOf(searchForm.title) < 0) temp = false;
                if (searchForm.key != '' && boldListData[i].key.indexOf(searchForm.key) < 0) temp = false;
                if (searchForm.date.length != 0 && (new Date(boldListData[i].UpdateTime) <= new Date(searchForm.date[0]) || new Date(boldListData[i].UpdateTime) >= new Date(searchForm.date[1]))) temp = false;
                if (searchForm.type.length == 1) {
                    if (searchForm.type[0] == '顶置' && !boldListData[i].top) temp = false;
                    if ((searchForm.type[0] == '热评' || searchForm.type[1] == '热评') && !boldListData[i].fire) temp = false;
                } else if (searchForm.type.length == 2) {
                    if (!boldListData[i].top || !boldListData[i].fire) temp = false;
                }
                if (temp) {
                    newData.push(boldListData[i]);
                }
            }
        }
    }
    for (var i = (req.query.page - 1) * req.query.size; i < req.query.page * req.query.size && i < newData.length; i++) {
        current.push(newData[i]);
    }
    return res.json({ state: 'SUCCESS', data: current, total: newData.length });
    fs.close(fboldlist);
});

/**
 * [获取博文]
 * @param  {[type]} req  [ 提交params ]
 * @param  {[type]} res) [ 匹配返回博文 ]
 * @return {[type]}      [ 不匹配返回提示信息 ]
 */
apiRoutes.get('/boldID', function(req, res) {
    var fbold = fs.openSync('./static/database/bold.json', 'r+');
    var data = fs.readFileSync(fbold, "utf8"),
        boldListData;
    (data.toString() == "[]" || data.toString() == null || data.toString() == "" ? boldListData = [] : boldListData = JSON.parse(data.toString()));
    for (var i = 0; i < boldListData.length; i++) {
        if (req.query.boldID == boldListData[i].id) {
            var _callback = boldListData[i];
            (i == 0 ? _callback.prevID = -1 : _callback.prevID = boldListData[i - 1].id);
            (i == (boldListData.length - 1) ? _callback.nextID = -1 : _callback.nextID = boldListData[i + 1].id);
            return res.json({ state: 'SUCCESS', data: _callback });
        }
    }
    return res.json({ state: 'ERROR', info: '寻找的博文丢失了,请联系管理员.' });
    fs.close(fbold);
});

/**
 * [添加/编辑博文]
 * @param  {[type]} req  [ 提交参数 ]
 * @param  {[type]} res 
 * @return {[type]}      [ 返回状态,并提示信息 ]
 */
apiRoutes.post('/boldID', function(req, res) {
    var fbold = fs.openSync('./static/database/bold.json', 'r+');
    var data = fs.readFileSync(fbold, "utf8"),
        boldListData;
    (data.toString() == "[]" || data.toString() == null || data.toString() == "" ? boldListData = [] : boldListData = JSON.parse(data.toString()));
    if (req.body.params.bold.id == -1) {
        req.body.params.bold.NewTime = req.body.params.bold.UpdateTime;
        if (boldListData.length == 0) {
            req.body.params.bold.id = 1
        } else {
            req.body.params.bold.id = boldListData[0].id + 1;
        }
        boldListData.unshift(req.body.params.bold);
    } else {
        for (var i = 0; i < boldListData.length; i++) {
            if (req.body.params.bold.id == boldListData[i].id) {
                boldListData.splice(i, 1, req.body.params.bold);
            }
        }
    }
    var newData = JSON.stringify(boldListData);
    fs.writeFile(fbold, newData, function(err) {
        if (err) {
            return res.send({ state: 'ERROR', info: '编辑失败,请联系管理员!' });
        }
        return res.json({
            state: 'SUCCESS',
            info : '提交成功',
            data : {
                id: req.body.params.bold.id
            }
        });
        fs.close(fbold);
    });
});

// 项目列表数据
var projectListData = require('../static/database/project.json');
apiRoutes.get('/project', function(req, res) {
    if (projectListData.length == 0) return res.json({ state: 'SUCCESS', data: [] });
    var newData = [],
        current = [];
    for (var i = 0; i < projectListData.length; i++) {
        if (req.query.searchForm == null || req.query.searchForm == '' || req.query.searchForm == undefined) {
            newData.push(projectListData[i]);
        } else {
            var searchForm = JSON.parse(req.query.searchForm);
            if (!searchForm.senior) {
                if (projectListData[i].title.indexOf(searchForm.title) >= 0) {
                    newData.push(projectListData[i]);
                }
            } else {
                var temp = true;
                if (searchForm.title != '' && projectListData[i].title.indexOf(searchForm.title) < 0) temp = false;
                if (searchForm.key != '' && projectListData[i].key.indexOf(searchForm.key) < 0) temp = false;
                if (searchForm.date.length != 0 && (new Date(projectListData[i].UpdateTime) <= new Date(searchForm.date[0]) || new Date(projectListData[i].UpdateTime) >= new Date(searchForm.date[1]))) temp = false;
                if (searchForm.type.length == 1) {
                    if (searchForm.type[0] == '顶置' && !projectListData[i].top) temp = false;
                    if ((searchForm.type[0] == '热评' || searchForm.type[1] == '热评') && !projectListData[i].fire) temp = false;
                } else if (searchForm.type.length == 2) {
                    if (!projectListData[i].top || !projectListData[i].fire) temp = false;
                }
                if (temp) {
                    newData.push(projectListData[i]);
                }
            }
        }
    }
    for (var i = (req.query.page - 1) * req.query.size; i < req.query.page * req.query.size && i < newData.length; i++) {
        current.push(newData[i]);
    }
    return res.json({ state: 'SUCCESS', data: current, total: newData.length });
});

apiRoutes.get('/music', function(req, res) {
    res.json(music);
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

var generateToken = function(_length) {
    var length      = 60,
        string      = "abcdefghijklmnopqrstuvwxyz",
        strUpper    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numeric     = '0123456789',
        punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=',
        token       = "";
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
