Body.servers = new class {
    father;
    element;
    object;
    constructor(fa) {
        this.father = fa;
        this.build();
        this.bind();
        console.log("Object Body.servers has been built");
    }
    build() {
        this.element = Make.dialog(
            "server-dialog",
            "社区服务器浏览器",
            Make.element('div', [{
                "key": "class",
                "value": "mdui-table-fluid"
            }], Make.element('table', [{
                "key": "class",
                "value": "mdui-table"
            }], Make.element('thead', [],
                Make.element('tr', [],
                    Make.element('th', [], '服务器描述').outerHTML +
                    Make.element('th', [], '服务器维护者').outerHTML +
                    Make.element('th', [], '操作').outerHTML
                ).outerHTML
            ).outerHTML +
            Make.element('tbody', [{
                "key": "id",
                "value": "servers_body"
            }]).outerHTML
            ).outerHTML).outerHTML +
            Make.element('div', [{
                "key": "class",
                "value": "mdui-textfield"
            }], Make.element('input', [{
                "key": "class",
                "value": "mdui-textfield-input"
            },
            {
                "key": "type",
                "value": "text"
            },
            {
                "key": "placeholder",
                "value": "自定义API地址"
            },
            {
                "key": "id",
                "value": "input-API"
            }
            ]).outerHTML).outerHTML +
            Make.element('button', [{
                "key": "class",
                "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
            },
            {
                "key": "id",
                "value": "join"
            }
            ], "加入服务器").outerHTML,
            Make.element('button', [{
                "key": "class",
                "value": "mdui-btn mdui-ripple"
            },
            {
                "key": "mdui-dialog-cancel",
                "value": ""
            }
            ]).outerHTML
        );
        this.father.appendChild(this.element);
        this.object = new mdui.Dialog(this.element);
    }
    bind() {
        var servers = res.split('\n');
        for (var i = 0; i < servers.length; i++) {
            var server = servers[i].split(' ');
            var tr = Make.element('tr', [],
                Make.element('td', [], server[0]).outerHTML +
                Make.element('td', [], server[1]).outerHTML +
                Make.element('td', [],
                    Make.element('a', [{
                        "key": "class",
                        "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
                    },
                    {
                        "key": "href",
                        "value": server[2]
                    }
                    ], "查看详情").outerHTML + " " +
                    Make.element('button', [{
                        "key": "class",
                        "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
                    },
                    {
                        "key": "onclick",
                        "value": "backend.changeAPI('" + server[3] + "');"
                    },
                    {
                        "key": "mdui-dialog-cancel",
                        "value": ""
                    }
                    ], "加入服务器").outerHTML
                ).outerHTML
            );
            $('#servers_body')[0].appendChild(tr);
        }
        $('#join')[0].onclick = () => {
            backend.changeAPI($('#input-API')[0].value);
        };
    }
}(document.body);