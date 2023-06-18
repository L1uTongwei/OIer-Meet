Body.container.problem = new class{
    father;
    element;
    constructor(fa){
        this.father = fa;
        this.build();
        this.bind();
    }
    build(){
        this.element = Make.element('div', [
            {"key": "id", "value": "problem"},
            {"key": "class", "value": "mdui-p-a-5"}
        ], "test");
        this.father.appendChild(this.element);
    }
    bind(){
        
    }
}(Body.container.element);