Body.container.userlist = new class {
    element;
    father;
    constructor(fa) {
        this.father = fa;
        this.build();
    }
    updateUserlist(page) { //用户列表
        $('#userlist_body')[0].innerHTML = "";
        backend.call("/get_userlist", {"page": page}, (res) => {
            for(var i = 0; i < res.data.length; i++){
                if(!res.data[i].province) res.data[i].province = "";
                if(!res.data[i].school) res.data[i].school = "";
                if(!res.data[i].avatar) res.data[i].avatar = "https://gitsr.cn/oier-meet/omweb/raw/branch/master/avatar.png";
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