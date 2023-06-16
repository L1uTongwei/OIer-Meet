Body.container.homepage = new class {
    element;
    father;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.container.homepage has been built");
    }
    build() {
        this.#element = Make.element('div', [
            {"key": "id", "value": "homepage"},
            {"key": "class", "value": "mdui-p-a-5"}
        ]);
        this.father.appendChild(this.element);
    }
    bind() {
        $.get(backend.url + "/intro", (res) => {
            $("#homepage")[0].innerHTML = md.render(res);
        });
    }
}(Body.container.element);