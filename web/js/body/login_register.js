Body.login_register = new class {
    father;
    element;
    object;
    objectTAB;
    #flgRegister = false;
    constructor(fa) {
        this.father = fa;
        this.build();
        this.bind();
        console.log("Object Body.login_register has been built");
    }
    build() {
        this.element = Make.dialog(
            'lr-dialog',
            Make.element('span', [
                {"key": "id", "value": "dialog-title-action"}
            ], "登录 OIer Meet!").outerHTML
            + Make.element('div', [
                {"key": "class", "value": "mdui-tab mdui-tab-centered mdui-tab-active"},
                {"key": "id", "value": "dialog-tab"},
                {"key": "mdui-tab", "value": ""}
            ],  Make.element('a', [
                    {"key": "id", "value": "dia-tab-l"},
                    {"key": "class", "value": "mdui-ripple"}
                ], "登录").outerHTML
                + Make.element('a', [
                    {"key": "id", "value": "dia-tab-r"},
                    {"key": "class", "value": "mdui-ripple"}
                ], "注册").outerHTML
            ).outerHTML,
            Make.element('div', [
                {"key": "class", "value": "mdui-container"},
                {"key": "id", "value": "dialog-login-register-page-login"}
            ],  Make.element('div', [
                    {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"},
                        {"key": "id", "value": "lab-username"}
                    ], "用户名").outerHTML
                + Make.element('input', [
                        {"key": "class", "value": "mdui-textfield-input"},
                        {"key": "id", "value": "in-username"}
                    ]).outerHTML
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"},
                        {"key": "id", "value": "lab-password"}
                    ], "密码").outerHTML
                + Make.element('input', [
                        {"key": "class", "value": "mdui-textfield-input"},
                        {"key": "id", "value": "in-password"},
                        {"key": "type", "value": "password"}
                    ]).outerHTML
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"},
                        {"key": "id", "value": "lab-captcha"}
                    ], "验证码").outerHTML
                + Make.element('input', [
                        {"key": "class", "value": "mdui-textfield-input"},
                        {"key": "id", "value": "in-captcha"},
                    ]).outerHTML
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-img-fluid"},
                    {"key": "id", "value": "login-captcha-img"}
                ]).outerHTML
            + Make.element('a', [
                    {"key": "onclick", "value": "backend.refreshCaptcha('#login-captcha-img');"},
                ], "看不清？换一张").outerHTML
            ).outerHTML
        + Make.element('div', [
                {"key": "class", "value": "mdui-container"},
                {"key": "id", "value": "dialog-login-register-page-register"}
            ],  Make.element('div', [
                    {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"},
                        {"key": "id", "value": "lab-r-username"}
                    ], "用户名").outerHTML
                + Make.element('input', [
                        {"key": "class", "value": "mdui-textfield-input"},
                        {"key": "id", "value": "in-r-username"}
                    ]).outerHTML
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"},
                        {"key": "id", "value": "lab-r-password"}
                    ], "密码").outerHTML
                + Make.element('input', [
                        {"key": "class", "value": "mdui-textfield-input"},
                        {"key": "id", "value": "in-r-password"},
                        {"key": "type", "value": "password"}
                    ]).outerHTML
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"},
                        {"key": "id", "value": "lab-r-lgverify"}
                    ], "洛谷验证剪贴板").outerHTML
                + Make.element('input', [
                        {"key": "class", "value": "mdui-textfield-input"},
                        {"key": "id", "value": "in-r-lgverify"},
                    ]).outerHTML
                ).outerHTML
            + Make.element('label', [
                    {"key": "class", "value": "mdui-textfield-label"},
                    {"key": "id", "value": "lab-r-lgverify-info"}
                ], "请用您需要绑定的洛谷账号创建一个公开的云剪贴板，内容为"
                + Make.element('br').outerHTML
                + Make.element('span', [
                        {"key": "style", "value": "font-weight:800;"},
                        {"key": "id", "value": "luogu-verify-id-display"}
                ]).outerHTML
                + Make.element('br').outerHTML
                + "并将云剪贴板地址后 8 个字符填入上方的文本框"
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"},
                        {"key": "id", "value": "lab-r-captcha"}
                    ], "验证码").outerHTML
                + Make.element('input', [
                        {"key": "class", "value": "mdui-textfield-input"},
                        {"key": "id", "value": "in-r-captcha"},
                    ]).outerHTML
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-img-fluid"},
                    {"key": "id", "value": "register-captcha-img"}
                ]).outerHTML
            + Make.element('a', [
                    {"key": "onclick", "value": "backend.refreshCaptcha('#register-captcha-img');"},
                ], "看不清？换一张").outerHTML
            ).outerHTML,
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "id", "value": "dialog-btn-cancel"},
                {"key": "mdui-dialog-cancel", "value": ""}
            ], '取消').outerHTML +
            Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple"},
                {"key": "mdui-dialog-confirm", "value": ""},
                {"key": "id", "value": "dialog-btn-ok"}
            ], '提交').outerHTML
        );
        this.father.appendChild(this.element);
        this.object = new mdui.Dialog(this.element);
        this.objectTAB = new mdui.Tab("#dialog-tab");
    }
    bind() {
        this.#flgRegister = false;
        $('#dia-tab-l')[0].onclick = () => {
            $('#dialog-title-action')[0].innerText = "登录 OIer-Meet!";
            $('#dialog-login-register-page-login')[0].style.display = "block";
            $('#dialog-login-register-page-register')[0].style.display = "none";
            this.#flgRegister = false;
            $('#dialog-btn-ok')[0].innerText = "登录";
            backend.refreshCaptcha("#login-captcha-img");
        };
        $('#dia-tab-r')[0].onclick = () => {
            $('#dialog-title-action')[0].innerText = "注册 OIer-Meet!";
            $('#dialog-login-register-page-login')[0].style.display = "none";
            $('#dialog-login-register-page-register')[0].style.display = "block";
            this.#flgRegister = true;
            $('#dialog-btn-ok')[0].innerText = "注册";
            backend.refreshCaptcha("#register-captcha-img");
        };
        $('#dialog-btn-ok')[0].onclick = () => {
            var action = (res) => {
                if (res.status == 200) {
                    window.localStorage.setItem("uid", res.data.uid);
                    window.localStorage.setItem("operator", res.data.operator);
                    window.localStorage.setItem("time", (new Date).getTime());
                }
                var msg = res.msg;
                if (!msg) msg = res.data.msg;
                mdui.snackbar({
                    message: msg,
                    timeout: 500,
                    onClosed: () => {
                        setTimeout(() => {
                            location.reload();
                        }, 500);
                    }
                });
            };
            if (!this.#flgRegister) {
                backend.call("/login", {
                    username: $('#in-username')[0].value,
                    password: $('#in-password')[0].value,
                    verify: $('#in-captcha')[0].value
                }, action);
            } else {
                backend.call("/register", {
                    username: $('#in-r-username')[0].value,
                    password: $('#in-r-password')[0].value,
                    verify: $('#in-r-captcha')[0].value,
                    link: $('#in-r-lgverify')[0].value
                }, action);
            }
        };
    }
}(document.body);