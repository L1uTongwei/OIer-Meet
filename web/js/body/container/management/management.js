Body.container.management = new class {
    father;
    element;
    constructor(fa) {
        this.father = fa;
        this.build();
    }
    build() {
        this.element = Make.element('div', [
            {"key": "id", "value": "management"},
            {"key": "class", "value": "mdui-p-a-5"}
        ]);
        this.father.appendChild(this.element);
        console.log("Object Body.container.management has been built");
    }
}(Body.container.element);