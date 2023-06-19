Body.container.about = new class {
    element;
    father;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.container.about has been built");
    }
    build() {
        this.element = Make.element('div', [
            {"key": "id", "value": "about"},
            {"key": "class", "value": "mdui-p-a-5"}
        ]);
        this.father.appendChild(this.element);
    }
    bind() {
        window.md_render("about", about);
    }
}(Body.container.element);