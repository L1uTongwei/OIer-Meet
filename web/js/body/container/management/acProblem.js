Body.container.management.acProblem = new class{
    father;
    dialog;
    object;
    element;
    constructor(fa){
        this.father = fa;
    }
    build(){
        this.dialog = Make.dialog(
            "acProblem",
            "设置入站答题",
            Make.element('div', [
                {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"},
                ], "请以 JSON 格式输入题目数据").outerHTML
            + Make.element('textarea', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "acProblem-data"}
                ]).outerHTML
            + "如果不知道含义，请查询<a href = 'https://oier-meet-dev-team.gitee.io/oier-meet'>文档</a>"
            ).outerHTML,
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], '取消').outerHTML
            + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-confirm", "value": ""},
                {"key": "id", "value": "acProblem-submit"}
            ], '提交').outerHTML
        );
        document.body.appendChild(this.dialog);
        this.object = new mdui.Dialog(this.dialog);
        this.element = Make.element('button', [
            {"key": "class", "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"},
            {"key": "onclick", "value": "Body.container.management.acProblem.object.open();"}
        ], "设置入站答题");
        this.element.appendChild(Make.element('div', [], " "));
        this.father.appendChild(this.element);
    }
    bind(){
        $('#acProblem-submit')[0].onclick = () => {
            backend.call('/set_acProblem', {"data": $('#acProblem-data')[0].value}, Backend.tips);
        };
    }
}(Body.container.management.element);