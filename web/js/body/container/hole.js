Body.container.hole = new class {
    element;
    father;
    constructor(fa) {
        this.father = fa;
        this.build();
        this.bind();
        console.log("Object Body.container.hole has been built");
    }
    build() {
        this.element = Make.element('div', [
            {"key": "id", "value": "hole"},
            {"key": "class", "value": "mdui-p-a-5"}
        ],  Make.element('textarea', [
                {"key": "class", "value": "mdui-textfield-input"},
                {"key": "type", "value": "text"},
                {"key": "placeholder", "value": "Say here~"},
                {"key": "id", "value": "word"}
            ]).outerHTML
        + Make.element('a', [
                {"key": "id", "value": "hole-go"},
                {"key": "class", "value": "mdui-btn mdui-btn-raised"}
            ], "Biu~").outerHTML
        );
        this.father.appendChild(this.element);
    }
    bind() {
        $('#hole-go')[0].onclick = () => {
            $('#word')[0].value = '';
            var rand = Math.floor(Math.random() * words.length);
            var rvalue = words[rand];
            mdui.dialog({
                title: 'hi，你收到了一条祝福',
                content: rvalue,
                buttons: [{
                    text: '确认'
                }]
            });
        };
    }
}(Body.container.element);