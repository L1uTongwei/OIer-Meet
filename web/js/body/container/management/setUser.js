Body.container.management.setUser = new class {
    element;
    object;
    constructor(fa) {
        this.father = fa;
    }
    build() {
        this.element = Make.dialog(
            "SetUser-dialog",
            "设置用户权限",
            Make.element('div', [
                {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"},
                ], "请指定用户名").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "SetUser-username"}
                ]).outerHTML
            ).outerHTML
          + Make.element('label', [
                {"key": "class", "value": "mdui-checkbox"}
            ], Make.element('input', [
                    {"key": "type", "value": "checkbox"},
                    {"key": "id", "value": "ban-check"}
                ]).outerHTML
              + Make.element('i', [
                    {"key": "class", "value": "mdui-checkbox-icon"}
                ]).outerHTML
              + "封禁用户"
            ).outerHTML
          + Make.element('label', [
                {"key": "class", "value": "mdui-checkbox"}
            ], Make.element('input', [
                    {"key": "type", "value": "checkbox"},
                    {"key": "id", "value": "operator-check"}
                ]).outerHTML
              + Make.element('i', [
                    {"key": "class", "value": "mdui-checkbox-icon"}
                ]).outerHTML
              + "管理员"
            ).outerHTML
          + Make.element('label', [
                {"key": "class", "value": "mdui-checkbox"}
            ], Make.element('input', [
                    {"key": "type", "value": "checkbox"},
                    {"key": "id", "value": "tag-check"}
                ]).outerHTML
              + Make.element('i', [
                    {"key": "class", "value": "mdui-checkbox-icon"}
                ]).outerHTML
              + "设置 Tag"
            ).outerHTML
          + Make.element('div', [
                {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"},
                ], "Tag").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "disabled", "value": ""},
                    {"key": "id", "value": "SetUser-tag"}
                ]).outerHTML
            ).outerHTML
          + Make.element('div', [
                {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"},
                ], "备注").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "SetUser-note"}
                ]).outerHTML
            ).outerHTML,
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], '取消').outerHTML
          + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-confirm", "value": ""},
                {"key": "id", "value": "SetUser-submit"}
            ], '提交').outerHTML
        );
        document.body.appendChild(this.element); //对话框不可以在底层
        this.object = new mdui.Dialog(this.element);
    }
    bind() {
        $('#ban-check')[0].indeterminate = true;
        $('#operator-check')[0].indeterminate = true;
        $('#tag-check')[0].onchange = () => {
            if($('#tag-check')[0].checked){
                $('#SetUser-tag').removeAttr("disabled");
            }else{
                $('#SetUser-tag')[0].setAttribute("disabled", "");
            }
        };
        $('#SetUser-submit')[0].onclick = () => {
            var args = new Object();
            args.judger = window.localStorage.getItem("uid");
            args.username = $('#SetUser-username')[0].value;
            if(!$('#ban-check')[0].indeterminate) args.ban = $('#ban-check')[0].checked;
            if(!$('#operator-check')[0].indeterminate) args.operator = $('#operator-check')[0].checked;
            if($('#tag-check')[0].checked) args.tag = $('#SetUser-tag')[0].value;
            backend.call('/set_user', args, ((args) => { return ((res) => {
                var note = $('#SetUser-note')[0].value;
                $('#SetUser-note')[0].value = "";
                Backend.tips(res);
                if(res.status == 200){
                    if(!$('#ban-check')[0].indeterminate){
                        if($('#ban-check')[0].checked){
                            backend.call('/log', {
                                "type": "用户权限调整",
                                "content": "将用户 " + args.username + " 设为封禁用户",
                                "note": (!note ? "管理员手动封禁" : note)
                            });
                        }else{
                            backend.call('/log', {
                                "type": "用户权限调整",
                                "content": "将用户 " + args.username + " 解封",
                                "note": (!note ? "管理员手动解封" : note)
                            });
                        }
                    }
                    if(!$('#operator-check')[0].indeterminate){
                        if($('#operator-check')[0].checked){
                            backend.call('/log', {
                                "type": "用户权限调整",
                                "content": "将用户 " + args.username + " 设为管理员",
                                "note": (!note ? "服主手动设置" : note)
                            });
                        }else{
                            backend.call('/log', {
                                "type": "用户权限调整",
                                "content": "将用户 " + args.username + " 取消管理员",
                                "note": (!note ? "服主手动设置" : note)
                            });
                        }
                    }
                    if($('#tag-check')[0].checked){
                        backend.call('/log', {
                            "type": "用户权限调整",
                            "content": "将用户 " + args.username + " 的 Tag 设为 " + args.tag,
                            "note": (!note ? "管理员手动设置" : note)
                        });
                    }
                }
            });})(args));
        };
    }
};