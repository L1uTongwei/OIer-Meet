Body.editor = new class {
    father;
    element;
    object;
    editor;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.editor has been built");
    }
    build() {
        this.element = Make.dialog(
            "editor-dialog",
            "编辑",
            Make.element('div', [{
                "key": "style", "value": "height: 500px;"
            }], Make.element('div', [
                    {"key": "style", "value": "height: 500px;"},
                    {"key": "id", "value": "editor-container"}
                ]).outerHTML
            ).outerHTML,
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], '关闭').outerHTML
            + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-confirm", "value": ""},
                {"key": "id", "value": "editor-submit"}
            ], '提交').outerHTML
        );
        this.father.appendChild(this.element);
        this.object = new mdui.Dialog(this.element);
        this.editor = new MarkdownPalettes("#editor-container");
    };
}(document.body);