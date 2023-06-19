Body.container.discuss.renderPostCode = (id, myid, msg, avatar, username, tag, send_time, top = false, reply = false) => { //渲染单个帖子
    var extra = Make.element('script').outerHTML, extra2 = "", extra3 = "";
    var img = "", notop = "";
    if(tag) 
        extra = Make.element('span', [
            {"key": "class", "value": "border-radius: 2px; background-color: #8e44ad;"}
        ], tag);
    if(avatar)
        img = Make.element('img', [
            {"key": "class", "value": "mdui-card-header-avatar"},
            {"key": "src", "value": avatar}
        ]).outerHTML;
    if(!top){
        extra3 = Make.element('div', [
            {"key": "class", "value": "mdui-panel"},
            {"key": "mdui-panel", "value": ""},
            {"key": "id", "value": "reply-panel-" + myid}
        ],  Make.element('div', [
                {"key": "class", "value": "mdui-panel-item"}
            ],  Make.element('div', [
                    {"key": "class", "value": "mdui-panel-item-header"}
                ], "点击展开回复").outerHTML
                + Make.element('div', [
                        {"key": "class", "value": "mdui-panel-item-body"}
                    ],  Make.element('div', [
                            {"key": "id", "value": "reply-body-" + myid}
                        ]).outerHTML
                        + Make.element('div', [
                            {"key": "id", "value": "reply-page-" + myid}
                        ]).outerHTML
                    ).outerHTML
                ).outerHTML
            ).outerHTML
        + Make.element('br').outerHTML;
        extra2 = Make.element('div', [
            {"key": "class", "value": "mdui-card-actions"}
        ], Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"},
                {"key": "onclick", "value": "(" + ((id) => {
                    $("#editor-submit")[0].onclick = () => {
                        window.backend.call('/reply_replies', {
                            "father": id,
                            "message": window.body.editor.value()
                        }, Backend.tips);
                    };
                    window.body.editor.object.open();
                }).toString() + ")('" + id + "')"}
            ], "回复该评论").outerHTML
        + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"},
                {"key": "onclick", "value": "(" +  ((id) => {
                    window.backend.call('/delete_replies', {
                        "id": id,
                    }, Backend.tips);
                }).toString() + ")('" + myid + "')"}
            ], "删除回复").outerHTML
        ).outerHTML;
    }else if(reply){
        extra2 = Make.element('div', [
                {"key": "class", "value": "mdui-card-actions"}
            ],  Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"},
                {"key": "onclick", "value": "(" + ((id, username) => {
                    $("#editor-submit")[0].onclick = () => {
                        window.backend.call('/reply_replies', {
                            "father": id,
                            "message": window.body.editor.value()
                        }, Backend.tips);
                    };
                    window.body.editor.value() = "回复 **@" + username + "**：";
                    window.body.editor.object.open();
                }).toString() + ")('" + id + "', '" + username + "')"}
            ], "回复二层评论").outerHTML
                + Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"},
                {"key": "onclick", "value": "(" + ((id) => {
                    window.backend.call('/delete_reply', {
                        "id": id,
                    }, Backend.tips);
                }).toString() + ")('" + myid + "')"}
            ], "删除评论").outerHTML
        ).outerHTML;
    }
    var id_str = id ? "ID: " + id + " " : "";
    return Make.element('div', [
        {"key": "class", "value": "mdui-card"}
    ],  Make.element('div', [
            {"key": "class", "value": "mdui-card-header"}
        ],  img
        + Make.element('div', [
                {"key": "class", "value": "mdui-card-header-title"},
            ], username + extra).outerHTML
        + Make.element('div', [
                {"key": "class", "value": "mdui-card-header-subtitle"},
            ], send_time).outerHTML
        ).outerHTML
        + Make.element('div', [
            {"key": "class", "value": "mdui-card-content"}
        ], window.md_render("none", msg).getMarkdown() + extra3).outerHTML
        + extra2
    );
};