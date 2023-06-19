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
            Make.element('div', [
                {"key": "id", "value": "editor-container"}
            ]).outerHTML,
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
        $('#editor-dialog').on('opened.mdui.dialog', () => {
            this.editor = editormd("editor-container", {
                height: "500px",
                width: "100%",
                path: "lib/"
            });
            Body.editor.object.handleUpdate();
        });
        this.object = new mdui.Dialog(this.element);
    };
    value(){
        return this.editor.getMarkdown();
    }
}(document.body);