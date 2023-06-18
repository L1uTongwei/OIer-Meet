class Head { //标签 <head>
    element;
    #moduleList = [ //需要加载的 JS 文件
        "node_modules/mdui/dist/js/mdui.min.js",
        "node_modules/markdown-it/dist/markdown-it.min.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/markdown-palettes/dist/markdown-palettes.min.js",
        "node_modules/katex/dist/katex.min.js",
        "node_modules/katex/dist/contrib/auto-render.js",
        "node_modules/jqPaginator/dist/1.2.0/jqPaginator.min.js",
    ];
    #styleList = [ //需要加载的 CSS 文件
        "node_modules/mdui/dist/css/mdui.min.css",
        "node_modules/markdown-palettes/dist/markdown-palettes.css",
        "node_modules/katex/dist/katex.min.css"
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
            await this.loadJS(this.#moduleList[i], this.element);
        }
        for (var i = 0; i < this.#styleList.length; i++) {
            await this.loadCSS(this.#styleList[i], this.element);
        }
    }
    async loadModules(data){
        for(var key in data){
            await this.loadJS(key, this.element);
            if(typeof(data[key]) == "object"){
                await this.loadModules(data[key]);
            }
        }
    }
    build() { //构建 <head> 标签
        this.element = document.getElementsByTagName('head')[0];
        this.element.appendChild(Make.element('title', [], 'OIer Meet!')); //网站标题
        this.element.appendChild(Make.element('meta', [ //IE 兼容设置
            { "key": "http-equiv", "value": "X-UA-Compatible" },
            { "key": "content", "value": "IE=edge,chrome=1" }
        ]));
        this.element.appendChild(Make.element('meta', [ //解除同源限制
            { "key": "http-equiv", "value": "Access-Control-Allow-Origin" },
            { "key": "content", "value": "*" }
        ]));
        this.element.appendChild(Make.element('link', [ //加载 favicon.ico
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