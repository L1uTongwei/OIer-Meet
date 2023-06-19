Body.home = new class {
    father;
    element;
    object;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.home has been built");
    }
    build() {
        this.element = Make.dialog(
            "home-dialog",
            "用户主页",
            "",
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], "关闭").outerHTML
        );
        this.father.appendChild(this.element);
        this.object = new mdui.Dialog(this.element);
    }
    draw(uid) { //渲染个人主页
        backend.call("/get_user", {
            uid: uid
        }, (res) => {
            if (!res.data.homepage) res.data.homepage = "该用户未填写主页内容";
            window.md_render("home-dialog-content", res.data.homepage);
            renderMathInElement($("#home-dialog-content")[0], katex_config);
            this.object.handleUpdate();
        });
    }
}(document.body);