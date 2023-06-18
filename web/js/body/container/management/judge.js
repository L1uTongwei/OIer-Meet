Body.container.management.judge = new class{
    father;
    element;
    constructor(fa){
        this.father = fa;
    }
    build(){
        this.element = Make.element('button', [
            {"key": "class", "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"},
            {"key": "onclick", "value": "Body.container.management.setUser.object.open();"}
        ], "设置用户权限");
        this.father.appendChild(this.element);
        this.father.appendChild(Make.element('div', [
            {"key": "class", "value": "mdui-table-fluid"}
        ],  Make.element('table', [
                {"key": "class", "value": "mdui-table"}
            ],  Make.element('thead', [],
                Make.element('tr', [],
                    Make.element('th', [], "举报类型").outerHTML
                    + Make.element('th', [], "举报详情").outerHTML
                    + Make.element('th', [], "备注").outerHTML
                    + Make.element('th', [], "被举报次数").outerHTML
                    + Make.element('th', [], '操作').outerHTML
                    ).outerHTML
                ).outerHTML
            + Make.element('tbody', [
                    {"key": "id", "value": "judge_body"}
                ]).outerHTML
            ).outerHTML
        ));
        this.father.appendChild(Make.element('div', [
            {"key": "id", "value": "judge-page"}
        ]));
        $('#judge-page').jqPaginator(Make.pageConfig(20, this.updateJudge));
    }
    updateJudge(page) {
        backend.call("/get_judgelist", {page: page}, (res) => {
            for(var i = 0; i < res.data.length; i++){
                var line = Make.element('tr', [],
                  Make.element('td', [], res.data[i].type).outerHTML
                  + Make.element('td', [], res.data[i].content).outerHTML
                  + Make.element('td', [], res.data[i].note).outerHTML
                  + Make.element('td', [], res.data[i].times).outerHTML
                  + Make.element('td', [], 
                        Make.element('button', [
                            {"key": "class", "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"},
                            {"key": "onclick", "value": "body.management.judge(" + res.data[i].type + ", " + res.data[i].bid + ");"}
                        ], "同意").outerHTML
                      + Make.element('button', [
                            {"key": "class", "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"},
                            {"key": "onclick", "value": "body.management.reject(" + res.data[i]._id + ");"}
                        ], "拒绝").outerHTML
                      + Make.element('button', [
                            {"key": "class", "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"},
                            {"key": "onclick", "value": "body.management.note.object.open();"}
                        ], "备注").outerHTML
                    ).outerHTML
                );
                $('#log_body')[0].appendChild(line);
            }
            $('#judge-page').jqPaginator('option', {
                totalCounts: res.data.count,
                currentPage: page
            });
        });
    }
    judge(type, bid) {
        var note = $('#note')[0].value;
        $('#note')[0].value = "";
        if(type == "用户举报"){
            backend.call('/ban_user', {
                "uid": bid
            }, (res) => {
                Backend.tips(res);
                if(res.status == 200){
                    backend.call('/log', {
                        "type": "用户权限调整",
                        "content": "将用户 " + bid + "  设置为封禁用户",
                        "note": (!note ? "管理员应用户举报而调整权限" : note)
                    });
                }
            });
        }else if(type == "帖子举报"){
            backend.call('/delete_contents', {
                "id": bid
            }, (res) => {
                Backend.tips(res);
                if(res.status == 200){
                    backend.call('/log', {
                        "type": "删除帖子",
                        "content": "将帖子 " + bid + " 删除",
                        "note": (!note ? "管理员应用户举报而删除帖子" : note)
                    });
                }
            });
        }
    }
    reject(id) {
        backend.call('/delete_judge', {
            "id": id
        }, Backend.tips);
    }
}($('#management')[0]);