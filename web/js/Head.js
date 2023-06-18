class Head { //标签 <head>
    #moduleList = [ //需要加载的 JS 文件
        "https://cdn.bootcdn.net/ajax/libs/mdui/1.0.2/js/mdui.js",
        "https://cdn.bootcdn.net/ajax/libs/markdown-it/13.0.1/markdown-it.js",
        "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js",
        "markdown-palettes.js",
        "https://cdn.bootcdn.net/ajax/libs/KaTeX/0.16.6/katex.js",
        "https://cdn.bootcdn.net/ajax/libs/KaTeX/0.16.6/contrib/auto-render.js",
        "https://unpkg.com/jqPaginator@1.2.0/dist/1.2.0/jqPaginator.min.js"
    ];
    #styleList = [ //需要加载的 CSS 文件
        "https://cdn.bootcdn.net/ajax/libs/mdui/1.0.2/css/mdui.css",
        "MarkdownPalettes.css",
        "https://cdn.bootcdn.net/ajax/libs/KaTeX/0.16.6/katex.css"
    ];
    loadJS(url, doc) { //加载 JS 文件
        return new Promise((resolve) => {
            var script = Make.element('script', [
                { "key": "type", "value": "text/javascript" },
                { "key": "src", "value": url }
            ]);
            script.onload = () => {
                console.log("Loaded: " + url);
                resolve();
            };
            doc.appendChild(script);
        });
    }
    loadCSS(url, doc) {
        return new Promise((resolve) => {
            var style = Make.element('link', [
                { "key": "href", "value": url },
                { "key": "rel", "value": "stylesheet" }
            ]);
            style.onload = () => {
                console.log("Loaded: " + url);
                resolve();
            };
            doc.appendChild(style);
        });
    }
    async loadFiles() { //加载需要的文件
        for (var i = 0; i < this.#moduleList.length; i++) {
            await this.loadJS(this.#moduleList[i], document.head);
        }
        for (var i = 0; i < this.#styleList.length; i++) {
            await this.loadCSS(this.#styleList[i], document.head);
        }
    }
    async loadModules(data){
        for(var key in data){
            await this.loadJS(key, document.head);
            if(typeof(data[key]) == "object"){
                await this.loadModules(data[key]);
            }
        }
    }
    build() { //构建 <head> 标签
        document.head.appendChild(Make.element('title', [], 'OIer Meet!')); //网站标题
        document.head.appendChild(Make.element('meta', [ //IE 兼容设置
            { "key": "http-equiv", "value": "X-UA-Compatible" },
            { "key": "content", "value": "IE=edge,chrome=1" }
        ]));
        document.head.appendChild(Make.element('meta', [ //解除同源限制
            { "key": "http-equiv", "value": "Access-Control-Allow-Origin" },
            { "key": "content", "value": "*" }
        ]));
        document.head.appendChild(Make.element('link', [ //加载 favicon.ico
            { "key": "rel", "value": "icon" },
            { "key": "type", "value": "image/x-icon" },
            { "key": "href", "value": "https://gitsr.cn/oier-meet/omweb/raw/branch/master/favicon.ico" }
        ]));
        return this.loadFiles().then(() => {
            return $.get("js/modulesList.json").then((data) => {
                return this.loadModules(data);
            });
        });
    }
};
