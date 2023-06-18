Body.container.discuss.renderReply = (id, page) => { //渲染帖子
    backend.call("/get_contents", {id: id}, ((id) => {return (res) => { //加载主内容
        $('#content-' + id)[0].appendChild(this.getSignlePost(
                res.data[0]._id, res.data[0]._id, res.data[0].message, res.data[0].sender.avatar, res.data[0].sender.username, res.data[0].sender.tag,
                res.data[0].send_time, true
            )
        );
        backend.call("/get_replieslist", {father: id, page: page}, ((id) => {return (res) => {
            if(res.data == undefined) return;
            for(var i = 0; i < res.data.length; i++){
                $('#content-' + id)[0].appendChild(Make.element('br'));
                $('#content-' + id)[0].appendChild(this.getSignlePost(
                        id, res.data[i]._id, res.data[i].message, res.data[i].sender.avatar, res.data[i].sender.username, 
                        res.data[i].sender.tag, res.data[i].send_time
                    )
                );
                this.panels.set(res.data[i]._id, new mdui.Panel('#reply-panel-' + res.data[i]._id));
                $('#reply-page-' + res.data[i]._id).jqPaginator(
                    Make.pageConfig(20, ((id, fid) => {return (num) => {
                        if(this.pages.get(id) == num) return;
                        this.renderReply2(fid, id, num);
                        this.pages.set(id, num);
                    }})(res.data[i]._id, id))
                );
            }
            $('#content-' + id)[0].innerHTML += 
                Make.element('br').outerHTML
              + Make.element('div', [
                    {"key": "id", "value": "reply-" + id}
                ]).outerHTML
              + Make.element('br').outerHTML
              + Make.element('div', [
                    {"key": "class", "value": "mdui-panel-item-actions"}
                ],  Make.element('button', [
                        {"key": "class", "value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"},
                        {"key": "onclick", "value": "(" + ((id) => {
                            $("#editor-submit")[0].onclick = () => {
                                window.backend.call("/reply_contents", {
                                    "father": id,
                                    "message": window.body.editor.editor.content
                                }, Backend.tips);
                            };
                            window.body.editor.object.open();
                        }).toString() + ")('" + id + "')"}
                    ], "回复该贴").outerHTML
                + Make.element('button', [
                        {"key": "class", "value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"},
                        {"key": "onclick", "value": "(" + ((id) => {
                            window.backend.call("/delete_contents", {
                                "id": id
                            }, Backend.tips);
                        }).toString() + ")('" + id + "')"}
                    ], "删除").outerHTML
                ).outerHTML
            + Make.element('br').outerHTML
            + Make.element('div', [
                    {"key": "id", "value": id + "-page"}
                ]).outerHTML;
            this.pages.set(id, 1);
            $('#' + id + '-page').jqPaginator(
                Make.pageConfig(20, ((id) => {return (num) => {
                    if(this.pages.get(id) == num) return;
                    this.renderReply(id, num);
                    this.pages.get(id) = num;
                }})(id))
            );
        }})(id));
    }})(id));
};