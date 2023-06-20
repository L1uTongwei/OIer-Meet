class Head { //标签 <head>
    #moduleList = [ //需要加载的 JS 文件
        "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js",
        "https://cdn.bootcdn.net/ajax/libs/editor-md/1.5.0/editormd.min.js",
        "jqPaginator.min.js",
        "https://cdn.bootcdn.net/ajax/libs/marked/4.3.0/marked.min.js"
    ];
    #styleList = [ //需要加载的 CSS 文件
        "css/index.css",
        "css/editormd.min.css"
    ];
    #total = 0;
    #loaded = 0;
    loadJS(url, doc) { //加载 JS 文件
        return new Promise((resolve) => {
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = url;
            document.getElementById("load").innerText = "当前已加载：" + url;
            document.getElementById("load-progress").style = "width: " + this.#loaded / this.#total * 100 + "%";
            script.onload = () => {
                this.#loaded++;
                console.log("Loaded: " + url);
                resolve();
            };
            doc.appendChild(script);
        });
    }
    loadCSS(url, doc) {
        return new Promise((resolve) => {
            var style = document.createElement('link');
            style.rel = "stylesheet";
            style.href = url;
            document.getElementById("load").innerText = "当前已加载：" + url;
            document.getElementById("load-progress").style = "width: " + this.#loaded / this.#total * 100 + "%";
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
            if(key == "total") continue;
            await this.loadJS(key, document.head);
            if(typeof(data[key]) == "object"){
                await this.loadModules(data[key]);
            }
        }
    }
    build() { //构建 <head> 标签
        return this.loadFiles().then(() => {
            return $.get("js/modulesList.json").then((data) => {
                this.#total = this.#moduleList.length + this.#styleList.length + data.total;
                return this.loadModules(data);
            });
        });
    }
};
