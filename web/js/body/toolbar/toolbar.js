Body.toolbar = new class {
    father;
    element;
    constructor(fa) {
        this.father = fa;
        this.build();
        this.bind();
    }
    build() {
        this.element = Make.element('div', [{
            "key": "id",
            "value": "bar"
        },
        {
            "key": "class",
            "value": "mdui-appbar"
        }
        ], Make.element('div', [{
            "key": "style",
            "value": "opacity: 0.9; z-index: 0;"
        },
        {
            "key": "class",
            "value": "mdui-toolbar mdui-color-light-blue-300"
        },
        {
            "key": "id",
            "value": "toolbar"
        }
        ], Make.element('a', [{
            "key": "href",
            "value": "javascript:Backend.tips({\"msg\": \"刷新成功\"});"
        },
        {
            "key": "class",
            "value": "mdui-typo-title"
        }
        ], "OIer Meet!").outerHTML +
        Make.element('div', [{
            "key": "class",
            "value": "mdui-toolbar-spacer"
        }]).outerHTML +
        Make.toolbarButton("javascript:Backend.tips({\"msg\": \"刷新成功\"});", "refresh",
            "刷新").outerHTML +
        Make.toolbarButton("javascript:body.report.object.open();", "report", "举报")
            .outerHTML +
        Make.toolbarButton("javascript:body.UI.object.open();", "settings", "UI 设置")
            .outerHTML +
        Make.toolbarButton("javascript:body.servers.object.open();", "dns", "社区服务器浏览器")
            .outerHTML +
        Make.toolbarButton("javascript:;", "", "", "user-avatar").outerHTML
        ).outerHTML);
        this.father.appendChild(this.element);
    }
    bind() {
        $('#user-avatar')[0].className = "mdui-btn mdui-btn-icon";
    }
}(Body.element);