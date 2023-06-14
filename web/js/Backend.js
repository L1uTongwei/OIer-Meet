class Backend { //后端设置
    url;
    constructor() { this.url = window.localStorage.getItem("API_URL"); }
    static tips(res) { //消息提示
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
    }
    logout() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("uid");
        window.localStorage.removeItem("operator");
    }
    changeAPI(u) { //更改API地址
        if (this.url) {
            this.logout();
            this.call("/logout");
        }
        this.url = u;
        window.localStorage.setItem("API_URL", u);
        mdui.snackbar({
            message: "加入成功",
            timeout: 500,
            onClosed: () => {
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        });
    }
    call(inter, data = {}, onsuccess = () => { }, onerror = () => { }) {
        var extra = "";
        if (window.localStorage.getItem('token') != "") {
            extra = "?token=" + window.localStorage.getItem('token')
        }
        $.post({
            url: this.url + inter + extra,
            data: data,
            dataType: "json",
            crossDomain: true,
            success: onsuccess,
            error: onerror
        });
    }
    refreshCaptcha(obj) { //刷新验证码
        var cap = $(obj)[0];
        $.get({
            url: this.url + "/captcha",
            data: {
                "token": window.localStorage.getItem('token'),
                "time": new Date().getTime()
            },
            crossDomain: true,
            success: (res) => {
                cap.innerHTML = res;
            }
        });
    };
};