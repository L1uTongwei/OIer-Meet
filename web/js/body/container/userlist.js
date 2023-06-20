Body.container.userlist = new class {
    element;
    father;
    constructor(fa) {
        this.father = fa;
        this.build();
    }
    build(){
        this.element = Make.element('div', [
            {"key": "class", "value": "mdui-p-a-5"},
            {"key": "id", "value": "userlist"}
        ],  Make.element('label', [
                    {"key": "class", "value": "mdui-radio"}
                ],  Make.element('input', [
                        {"key": "type", "value": "radio"},
                        {"key": "name", "value": "search-radio"},
                        {"key": "value", "value": "uid"},
                        {"key": "checked", "value": ""}
                    ]).outerHTML
                  + Make.element('i', [
                        {"key": "class", "value": "mdui-radio-icon"}
                    ]).outerHTML
                  + "搜索 UID"
            ).outerHTML
          + Make.element('label', [
                    {"key": "class", "value": "mdui-radio"}
                ],  Make.element('input', [
                        {"key": "type", "value": "radio"},
                        {"key": "name", "value": "search-radio"},
                        {"key": "value", "value": "username"}
                    ]).outerHTML
                  + Make.element('i', [
                        {"key": "class", "value": "mdui-radio-icon"}
                    ]).outerHTML
                  + "搜索用户名"
            ).outerHTML
          + Make.element('label', [
                    {"key": "class", "value": "mdui-radio"}
                ],  Make.element('input', [
                        {"key": "type", "value": "radio"},
                        {"key": "name", "value": "search-radio"},
                        {"key": "value", "value": "lgusername"}
                    ]).outerHTML
                  + Make.element('i', [
                        {"key": "class", "value": "mdui-radio-icon"}
                    ]).outerHTML
                  + "搜索洛谷用户名"
            ).outerHTML
              + Make.element('div', [
                    {"key": "class", "value": "mdui-textfield"}
                ],  Make.element('label', [
                        {"key": "class", "value": "mdui-textfield-label"}
                    ], "请输入搜索内容").outerHTML
                + Make.element('input', [
                    {"key": "class", "value": "mdui-textfield-input"},
                    {"key": "id", "value": "search-content"}
                ]).outerHTML
            ).outerHTML
          + Make.element('a', [
                {"key": "id", "value": "search"},
                {"key": "class", "value": "mdui-btn mdui-btn-raised mdui-color-theme-accent"},
                {"key": "onclick", "value": "body.container.userlist.search()"}
            ], "搜索").outerHTML 
          + Make.element('br').outerHTML
          + Make.element('br').outerHTML
          + Make.element('div', [
                {"key": "class", "value": "mdui-table-fluid"}
            ],  Make.element('table', [
                    {"key": "class", "value": "mdui-table"}
                ],  Make.element('thead', [],
                        Make.element('tr', [],
                            Make.element('th', [], "UID").outerHTML
                            + Make.element('th', [], "用户名").outerHTML
                            + Make.element('th', [], "省份及学校").outerHTML
                            + Make.element('th', [], "洛谷用户名").outerHTML
                            + Make.element('th', [], "管理员").outerHTML
                            + Make.element('th', [], "是否被封禁").outerHTML
                            + Make.element('th', [], "注册时间").outerHTML
                        ).outerHTML
                    ).outerHTML
                + Make.element('tbody', [
                        {"key": "id", "value": "userlist_body"}
                    ]).outerHTML
                ).outerHTML
            ).outerHTML
        + Make.element('br').outerHTML
        + Make.element('div', [
                {"key": "id", "value": "userlist-page"}
            ]).outerHTML
        );
        this.father.appendChild(this.element);
    }
    updateUserlist(page) { //用户列表
        $('#userlist_body')[0].innerHTML = "";
        backend.call("/get_userlist", {"page": page}, (res) => {
            for(var i = 0; i < res.data.length; i++){
                if(!res.data[i].province) res.data[i].province = "";
                if(!res.data[i].school) res.data[i].school = "";
                if(!res.data[i].avatar) res.data[i].avatar = "/avatar.png";
                $('#userlist_body')[0].appendChild(((data) => {
                    return Make.element('tr', [],
                        Make.element('td', [], data._id).outerHTML
                        + Make.element('td', [], Make.name(data._id, data.username, data.avatar, data.tag).outerHTML).outerHTML
                        + Make.element('td', [], data.province + ' ' + data.school).outerHTML
                        + Make.element('td', [],
                                Make.element('a', [
                                    {"key": "href", "value": "https://www.luogu.com.cn/user/" + data.luogu_uid}
                                ], data.luogu_username).outerHTML
                            ).outerHTML
                        + Make.element('td', [], data.operator).outerHTML
                        + Make.element('td', [], data.banned).outerHTML
                        + Make.element('td', [], data.register_time).outerHTML
                    );
                })(res.data[i]));
            }
            $('#userlist-page').jqPaginator('option', {
                totalCounts: res.count,
                currentPage: page
            });
        });
    }
    bind() {
        $('#userlist-page').jqPaginator(Make.pageConfig(20, this.updateUserlist));
        console.log("Object Body.container.userlist has been built");
    }
    search() {
        backend.call("/search", {
            "type": $("#radioDiv input[name='search-radio']:checked").val(),
            "content": $('#search-content')[0].value
        }, (res) => {
            if(res.status == 200){
                var searched = Make.element('a', [
                    {"key": "name", "value": "searched"}
                ], this.addUserlist(res.data));
                $('#userlist_body')[0].appendChild(searched);
                searched.scrollIntoView({behavior: 'smooth'});
            }
        });
    }
}(Body.container.element);