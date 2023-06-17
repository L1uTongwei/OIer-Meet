Body.report = new class {
    element;
    father;
    object;
    constructor(fa) {
        this.father = fa;
        this.build();
        this.bind();
        console.log("Object Body.report has been built");
    }
    build() {
        this.#element = Make.dialog(
            "report-dialog",
            "举报",
            Make.element('label', [
                {"key": "class", "value": "mdui-radio"}
            ],  Make.element('input', [
                    {"key": "type", "value": "radio"},
                    {"key": "name", "value": "report-type"},
                    {"key": "value", "value": "用户举报"},
                    {"key": "checked", "value": ""}
                ]).outerHTML
            + Make.element('i', [
                    {"key": "class", "value": "mdui-radio-icon"}
                ]).outerHTML
            + "用户举报"
            ).outerHTML
            + Make.element('label', [
                {"key": "class", "value": "mdui-radio"}
            ],  Make.element('input', [
                    {"key": "type", "value": "radio"},
                    {"key": "name", "value": "report-type"},
                    {"key": "value", "value": "帖子举报"}
                ]).outerHTML
            + Make.element('i', [
                    {"key": "class", "value": "mdui-radio-icon"}
                ]).outerHTML
            + "帖子举报"
            ).outerHTML
            + Make.element('div', [
                {"key": "class", "value": "mdui-textfield"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"}
                ], "ID").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "report-id"}
                ]).outerHTML
            ).outerHTML
            + Make.element('div', [
                {"key": "class", "value": "mdui-textfield"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"}
                ], "举报理由").outerHTML
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "report-note"}
                ]).outerHTML
            ).outerHTML,
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], "关闭").outerHTML
          + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "id", "value": "report-submit"},
                {"key": "mdui-dialog-confirm", "value": ""}
            ], "提交").outerHTML
        );
        this.father.appendChild(this.element);
        this.object = new mdui.Dialog(this.element);
    }
    bind() {
        $('#report-submit')[0].onclick = () => {
            backend.call("/report", {
                "type": $("#radioDiv input[name='report-type']:checked").val(),
                "bid": $('#report-id')[0].value,
                "note": $('#report-note')[0].value
            }, Backend.tips);
        };
    }
}(Body.element);