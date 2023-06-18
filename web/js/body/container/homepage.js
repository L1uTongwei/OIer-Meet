Body.container.homepage = new class {
    element;
    father;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.container.homepage has been built");
    }
    build() {
        this.element = Make.element('div', [
            {"key": "id", "value": "homepage"},
            {"key": "class", "value": "mdui-p-a-5"}
        ]);
        this.father.appendChild(this.element);
    }
    bind() {
        $.get(backend.url + "/intro", (data, status) => {
            if(status == "success"){
                $("#homepage")[0].innerHTML = window.md.render(data);
            }else{
                if(backend.url){
                    alert("服务器加载错误！请联系服务器管理员处理。");
                }
            }
        });
    }
}(Body.container.element);