---
title: token 架构
author: 刘桐玮
---

由于与在前端开发时的初衷严重不同，我需要在这里维护一个页面来避免后续问题。

下面是为了避免基本的跨域问题而设计的`nginx`配置：

```
add_header "Access-Control-Allow-Origin" $http_origin always;
add_header 'Access-Control-Allow-Credentials' true always;
add_header 'Access-Control-Allow-Methods' '*' always;
add_header 'Access-Control-Allow-Headers' 'Cookie,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,token,user-uuid,x-auth-token,access-control-allow-origin,nonce,authorization' always;
```

前端（`https://oier-meet.cn`）与后端是跨域的。由于浏览器限制，`cookies`很难共享。

所以前端选择在最容易获取到`token`的`/generate_key`方法中获取`token`。所以此处会生成一个`token`，来更新前端的`token`（如果前端没有`token`）

前端拿到`token`之后存储到`cookie`里，为时7天。

前端在发送任何请求时，都会加上字符串编码`?token=xxx`，而且必须在最前。后端获取字符串编码之后解析，这样就实现了伪跨域共享`token`啦。

这样有一个问题，如果服务器缓存丢失，客户端仍然保持登录状态，但是服务器并不承认登录。

可以使用每次同步登录状态的方式解决，**但我鸽了**。

目前这个问题并不突出，可以容忍。