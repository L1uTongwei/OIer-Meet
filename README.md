![](logo.png)

### 简介

这是 OIer Meet 的代码，部署于官方服务器， 使用 GPL-v3.0 开源许可证。

其使用 Node.js 实现，依赖 MongoDB 数据库运行。

请确定安装的 Node.js V8 引擎在版本 9.1 以上，并配置好 MongoDB 服务。

官方博客在 [这里](https://oier-meet-dev-team.gitee.io/oier-meet/)，请从这里了解详细文档！

### 使用

可以打开 https://oier-meet.cn 来使用前端应用。

也可以克隆仓库并打开 [index.html](web/index.html) 来使用前端。

以下是在 Linux 服务器下部署的过程：

```bash
$ git clone https://gitee.com/oier-meet-dev-team/oier-meet.git
$ cd oier-meet
$ cd server # 部署后端
$ npm install # 安装依赖
# 修改目录下 config.json 来配置数据库和其他设置
$ node initDatabase.js # 初始化数据库
$ sudo node installService.js # 安装服务
$ sudo systemctl start oiermeet # 运行服务器
# 这是添加管理员的命令行方法
$ node addOperator.js <用户名>
$ cd ../web # 部署前端
$ npm install
# 当前目录即为网站目录，请妥善配置前端服务器
```

### 配置文件

配置文件是 [config.json](server/config.json)，各字段注释如下：

```js
{
    "database": { //数据库
        "url": "mongodb://127.0.0.1:27017/", //数据库 URL
        "db": "oiermeet" //数据库名称
    },
    "server": { //服务器配置
        "port": 8080 //监听端口
    },
    "time": { //时间设置
        "lang": "zh-CN", //本地语言
        "timezone": "Asia/Shanghai" //时区
    },
    "operator": { //管理设置
        "super": false //超级权限，关闭之后只有命令行才可以设置管理员权限
    },
    "page_length": 20, //每页长度
    "luogu_proxy": "https://www.luogu.com.cn/paste/" //洛谷剪贴板地址
    //"luogu_proxy": "https://xxx.com/" //若遇到 Cloudflare 拦截可以自行配置反向代理
}
```

### 开发文档

详见博客。