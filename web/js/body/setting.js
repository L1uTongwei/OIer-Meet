Body.setting = new class {
    father;
    element;
    object;
    editor;
    constructor(fa){
        this.#father = fa;
        this.build();
        this.bind();
    }
    build(){
        this.#element = Make.dialog(
            "setting-dialog",
            "用户设置",
            Make.element('div', [
                {"key": "class", "value": "mdui-textfield"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"}
                ], "省份（匿名留空）").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "setting-province"}
                ]).outerHTML
            ).outerHTML
        + Make.element('div', [
                {"key": "class", "value": "mdui-textfield"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"}
                ], "学校（匿名留空）").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "setting-school"}
                ]).outerHTML
            ).outerHTML
        + Make.element('div', [
                {"key": "class", "value": "mdui-textfield"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"}
                ], "头像URL地址").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "setting-avatar"}
                ]).outerHTML
            ).outerHTML
        + Make.element('label', [
                {"key": "class", "value": "mdui-textfield-label"}
            ], "主页Markdown").outerHTML
        + Make.element('div', [
                {"key": "style", "value": editor_css}
            ],  Make.element('div', [
                    {"key": "id", "value": "setting-editor-container"},
                ]).outerHTML
            ).outerHTML,
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], "关闭").outerHTML
        + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "id", "value": "mylogout"}
            ], "注销").outerHTML
        + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "id", "value": "setting-submit"},
                {"key": "mdui-dialog-confirm", "value": ""}
            ], "提交").outerHTML
        );
        this.#father.appendChild(this.#element);
        this.object = new mdui.Dialog(this.#element);
    }
    bind(){
        this.editor = new MarkdownPalettes("#setting-editor-container");
        $('#mylogout')[0].onclick = () => {
            backend.call("/logout");
            backend.logout();
            Backend.tips({"msg": "操作成功"});
        };
        $('#setting-submit')[0].onclick = () => {
            backend.call("/user_setting", {
                province: $('#setting-province')[0].value,
                school: $('#setting-school')[0].value,
                avatar: $('#setting-avatar')[0].value,
                homepage: this.editor.content
            }, Backend.tips);
        };
    }
}(Body.element);