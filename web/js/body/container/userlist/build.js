Body.container.userlist.build = () => {
    this.#element = Make.element('div', [
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