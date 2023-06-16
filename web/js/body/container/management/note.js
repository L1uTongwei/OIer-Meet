Body.container.management.note = new class {
    element;
    father;
    object;
    constructor(fa) {
        this.father = fa;
        build();
    }
    build() {
        this.#element = Make.dialog(
            "note-dialog",
            "添加备注",
            Make.element('div', [
                {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"},
                ], "备注").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "note"}
                ]).outerHTML
            ).outerHTML
        );
        this.#father.appendChild(this.#element);
        this.object = new mdui.Dialog(this.#element);
    }
}(Body.container.management.element);