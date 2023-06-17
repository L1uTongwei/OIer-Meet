Body.container.discuss = new class {
    father;
    element;
    object;
    #pages = new Map();
    #panels = new Map();
    constructor(fa) {
        this.father = fa;
        this.build();
    }
    build() {
        this.#element = Make.element('div', [
            {"key": "id", "value": "discuss"},
            {"key": "style", "value": "padding: 40px;"}
        ],  Make.element('br').outerHTML
          + Make.element('div', [
                {"key": "class", "value": "mdui-panel"},
                {"key": "id", "value": "discuss_body"},
            ]).outerHTML
        + Make.element('br').outerHTML
        + Make.element('div', [
                {"key": "id", "value": "discuss-page"}
            ]).outerHTML
        + Make.element('div', [
                {"key": "class", "value": "mdui-textfield"}
            ],  Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "type", "value": "text"},
                    {"key": "placeholder", "value": "帖子标题"},
                    {"key": "id", "value": "topic"}
                ]).outerHTML
            ).outerHTML
        + Make.element('br').outerHTML
        + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"},
                {"key": "id", "value": "new-post"}
            ], "编辑内容并发表帖子").outerHTML
        + Make.element('br').outerHTML
        + Make.element('br').outerHTML
        );
        this.#father.appendChild(this.#element);
        this.object = new mdui.Panel("#discuss_body");
    }
    bind() {
        $('#new-post')[0].onclick = () => { //发帖
            $('#editor-submit')[0].onclick = () => {
                var topic = $("#topic")[0].value;
                var content = body.editor.editor.content;
                if (!content) content = "（未填写帖子内容）";
                backend.call("/send_post", {
                    topic: topic,
                    message: content
                }, Backend.tips);
            }
            body.editor.object.open();
        };
        $('#discuss-page').jqPaginator(Make.pageConfig(20, this.renderPost));
        console.log("Object Body.container.discuss has been built");
    }
}(Body.container.element);