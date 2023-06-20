Body.container = new class {
    element;
    father;
    constructor(fa) {
        this.father = fa;
        this.build();
        console.log("Object Body.container has been built");
    }
    build() {
        this.element = Make.element('div', [
            {"key": "id", "value": "container"},
            {"key": "class", "value": "mdui-container mdui-shadow-3"},
            {"key": "style", "value": "font-size: 18px; background-color: white; opacity: 0.9;"}
        ]);
        this.father.appendChild(this.element);
    }
    loadBackend() { //需要单独加载
        this.homepage.bind();
        this.userlist.bind();
        this.discuss.bind();
        //this.practice.bind();
        this.log.bind();
        this.about.bind();
        if(window.localStorage.getItem("operator")){
            this.management.acProblem.build();
            this.management.acProblem.bind();
            this.management.element.innerHTML += " ";
            this.management.judge.build();
            this.management.setUser.build();
            this.management.setUser.bind();
        }
        if(window.localStorage.getItem('speak') === false){
            this.acProblem.build();
            this.acProblem.bind();
        }
    }
}(document.body);