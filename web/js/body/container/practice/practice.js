Body.container.practice = new class {
    father;
    element;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.container.practice has been built");
    }
    build() {}
}(Body.container.element);