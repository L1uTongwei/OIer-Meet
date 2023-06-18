class Body { //标签 <body>
    element;
    constructor() {
        this.element = document.body;
        this.element.className = "mdui-theme-primary-light-blue mdui-theme-accent-orange";
        this.refreshBackground();
    }
    refreshBackground() {
        if (!window.localStorage.getItem('background')) { //初始化背景图片
            window.localStorage.setItem('background', "https://cdn.luogu.com.cn/upload/image_hosting/x5084f5q.png");
        }
        document.body.style = "background-image:url('" + window.localStorage.getItem('background') +
            "'); background-attachment: fixed; background-size: cover;";
    }
};