---
title: Render 服务部署教程
author: 刘桐玮
---

### 前置

首先登录 [Render](https://render.com/)，点击右上角，开始注册：

<!--more-->

![](/image/sign_up_render.png)

随后，进入控制台。

![](/image/dashboard.png)

在 Git 地址输入 https://github.com/LiuTianyouOnLuogu/LiuTianyouOnLuogu.github.io.git

### 前端部署

进入 "Static Sites" 来部署静态网站，在侧边栏登录 Github/Gitlab，并选择仓库：

![](/image/static-1.png)

按照图示配置仓库、分支、发布目录：

![](/image/static-2.png)

如果有域名的话，请执行下面几步；否则请直接使用自动生成的 https://<名称>.onrender.com 形式的域名。

然后进入 "Settigs" -> "Custom Domains"，输入自定义域名：

![](/image/static-3.png)

然后配置 DNS（因 DNS 服务商而异）：

![](/image/static-4.png)

返回，验证域名生效即可。

### 数据库部署

首先打开 [mongodb](https://www.mongodb.com/atlas/database)：

![](/image/database-1.png)

这个页面选择 "Manual"，继续：

![](/image/database-2.png)

如图所示，配置数据库：

![](/image/database-3.png)

在接下来的安全页中输入账号密码之类的，继续：

![](/image/database-4.png)

接下来，选择云服务，并且获取 IP，输入到白名单：

![](/image/database-5.png)

![](/image/database-6.png)

确定之后，进入数据库主界面，点击 "Connect"，弹出对话框：

![](/image/database-7.png)

选择第一个，继续：

![](/image/database-8.png)

复制显示的 URI，完成。

### 后端部署

点击右上角的加号，选择 "Web Service"，还是选择 Fork 仓库。

然后继续，按照图示配置：

![](/image/server-1.png)

![](/image/server-2.png)

（更正：应为 `node server.js`）

![](/image/server-3.png)

环境变量填入数据库相关数据。

若需要洛谷剪贴板反向代理（以绕过洛谷 Cloudflare），请自行配置并填入 `luogu_proxy`。

反向代理相关请自行搜索。

重复上述步骤，绑定域名即可。

### 前端服务器添加

在导入的 Github 仓库里打开 [web/js/define.js](web/js/define.js)：

更改服务器列表：

```javascript
var res = //服务器列表
    "OIer-Meet官方服务器 L1uTongwei https://gitee.com/oier-meet-dev-team https://api.oier-meet.cn"
  + "XXX服务器（名称） （维护者名称） （服务器描述页，选填） （服务器地址）";
```