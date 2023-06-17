Body.container.discuss.renderPost = (page) => { //社区
    backend.call("/get_contentslist", {page: page}, (res) => {
        for(var i = 0; i < res.data.length; i++){
            var panel = Make.element('div', [
                {"key": "class", "value": "mdui-panel-item"}
            ],  Make.element('div', [
                    {"key": "class", "value": "mdui-panel-item-header"}
                ],  Make.element('div', [
                        {"key": "class", "value": "mdui-panel-item-title"}
                    ], res.data[i].topic).outerHTML
                + Make.element('div', [
                        {"key": "class", "value": "mdui-panel-item-summary"}
                    ], "ID：" + res.data[i]._id).outerHTML
                + Make.element('div', [
                        {"key": "class", "value": "mdui-panel-item-summary"}
                    ], "发送者：" + Make.name(res.data[i].sender._id, res.data[i].sender.username, res.data[i].sender.avatar, res.data[i].sender.tag).outerHTML).outerHTML
                + Make.element('div', [
                        {"key": "class", "value": "mdui-panel-item-summary"}
                    ], "发送时间：" + res.data[i].send_time).outerHTML
                + Make.element('i', [
                        {"key": "class", "value": "mdui-panel-item-arrow mdui-icon material-icons"}
                    ], "keyboard_arrow_down").outerHTML
                ).outerHTML
            + Make.element('div', [
                    {"key": "class", "value": "mdui-panel-item-body"},
                    {"key": "id", "value": "content-" + res.data[i]._id}
                ]).outerHTML
            );
            $('#discuss_body')[0].appendChild(panel);
            this.renderReply(res.data[i]._id, 1);
        }
        $('#discuss-page').jqPaginator('option', {
            totalCounts: res.data.count,
            currentPage: page
        });
    });
};