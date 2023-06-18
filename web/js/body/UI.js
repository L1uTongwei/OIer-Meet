Body.UI = new class {
    father;
    element;
    object;
    constructor(fa) {
        this.father = fa;
        this.build();
        this.bind();
        console.log("Object Body.UI has been built");
    }
    build() {
        this.element = Make.dialog(
            "ui-dialog",
            "UI 设置",
            Make.element('div', [
                {"key": "class", "value": "mdui-textfield"}
            ],  Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"}
                ], "背景图片 URL（默认留空）").outerHTML 
            + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "background-url"}
                ]).outerHTML
            ).outerHTML,
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], '关闭').outerHTML +
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-confirm", "value": ""},
                {"key": "id", "value": "ui-submit"}
            ], '提交').outerHTML
        );
        this.father.appendChild(this.element);
        this.object = new mdui.Dialog(this.element);
    }
    bind() {
        $('#ui-submit')[0].onclick = () => {
            var url = $('#background-url')[0].value;
            if (!url) url = "https://cdn.luogu.com.cn/upload/image_hosting/x5084f5q.png";
            window.localStorage.setItem('background', url);
            Backend.tips({
                "msg": "操作成功"
            });
        };
    }
}(document.body);