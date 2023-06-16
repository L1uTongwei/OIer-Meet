Body.toolbar.tab = new class {
    father;
    element;
    object;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.tab has been built");
    }
    build() {
        var op = "";
        if (window.localStorage.getItem('operator')) op = Make.tabButton(
            '#management', "account_balance", "管理后台").outerHTML;
        this.element = Make.element('div', [{
            "key": "class",
            "value": "mdui-tab mdui-color-light-blue-300"
        },
        {
            "key": "style",
            "value": "opacity: 0.9"
        },
        {
            "key": "mdui-tab",
            "value": ""
        }
        ], Make.tabButton("#homepage", "home", "首页").outerHTML +
        Make.tabButton("#userlist", "list", "用户列表").outerHTML +
        Make.tabButton("#practice", "book", "Codeforces 练习").outerHTML +
        Make.tabButton("#discuss", "forum", "社区").outerHTML +
        Make.tabButton("#hole", "streetview", "无人树洞").outerHTML +
        Make.tabButton('#log', "content_paste", "管理日志").outerHTML +
        op +
        Make.tabButton("#about", "info", "关于").outerHTML);
        this.father.appendChild(this.element);
        this.object = new mdui.Tab(this.element);
    }
}(Body.toolbar.element);