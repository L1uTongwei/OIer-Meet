Body.container.log = new class {
    father;
    element;
    note;
    setUser;
    constructor(fa) {
        this.father = fa;
        this.build();
    }
    build() {
        this.element = Make.element('div', [
            {"key": "id", "value": "log"},
            {"key": "class", "value": "mdui-p-a-5"}
        ]);
        this.father.appendChild(this.element);
    }
    bind() {
        this.element.appendChild(Make.element('div', [
            {"key": "class", "value": "mdui-table-fluid"}
        ],  Make.element('table', [
                {"key": "class", "value": "mdui-table"}
            ],  Make.element('thead', [],
                Make.element('tr', [],
                    Make.element('th', [], "操作者").outerHTML
                    + Make.element('th', [], "操作类型").outerHTML
                    + Make.element('th', [], "操作详情").outerHTML
                    + Make.element('th', [], "备注").outerHTML
                    ).outerHTML
                ).outerHTML
            + Make.element('tbody', [
                    {"key": "id", "value": "log_body"}
                ]).outerHTML
            ).outerHTML
        ));
        this.element.appendChild(Make.element('br'));
        this.element.appendChild(Make.element('div', [
            {"key": "id", "value": "log-page"}
        ]));
        $('#log-page').jqPaginator(Make.pageConfig(20, this.updateLog));
        console.log("Object Body.container.log has been built");
    }
    updateLog(page = 1) {
        backend.call("/get_loglist", {page: page}, (res) => {
            for(var i = 0; i < res.data.length; i++){
                var line = Make.element('tr', [],
                    Make.element('td', [], res.data[i].operator).outerHTML
                  + Make.element('td', [], res.data[i].type).outerHTML
                  + Make.element('td', [], res.data[i].content).outerHTML
                  + Make.element('td', [], res.data[i].note).outerHTML
                );
                $('#log_body')[0].appendChild(line);
            }
            $('#log-page').jqPaginator('option', {
                totalCounts: res.data.count,
                currentPage: page
            });
        });
    }
}(Body.container.element);