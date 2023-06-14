class Make { //构造器
    static element(tag, data = [], text = '') { //创建一个元素
        var x = document.createElement(tag);
        for (var k of data) {
            x.setAttribute(k["key"], k["value"]);
        }
        x.innerHTML = text;
        return x;
    }
    static dialog(id, title, content, actions) { //构建对话框
        var dialog = this.element('div', [
            { "key": "id", "value": id },
            { "key": "class", "value": "mdui-dialog" }
        ]);
        dialog.appendChild(this.element('div', [
            { "key": "id", "value": id + "-title" },
            { "key": "class", "value": "mdui-dialog-title" },
        ], title));
        dialog.appendChild(this.element('div', [
            { "key": "id", "value": id + "-content" },
            { "key": "class", "value": "mdui-dialog-content" },
        ], content));
        dialog.appendChild(this.element('div', [
            { "key": "id", "value": id + "-actions" },
            { "key": "class", "value": "mdui-dialog-actions" },
        ], actions));
        return dialog;
    };
    static toolbarButton(href, icon, tool = "", id = "") { //增加 toolbar
        var button = this.element('a', [
            { "key": "id", "value": id },
            { "key": "href", "value": href },
            { "key": "class", "value": "mdui-ripple" }
        ]);
        button.appendChild(this.element('i', [
            { "key": "class", "value": "mdui-icon material-icons" }
        ], icon));
        if (tool != "") button.setAttribute('mdui-tooltip', "{content: '" + tool + "'}");
        return button;
    }
    static tabButton(href, icon, label) { //增加 Tab 
        var button = this.element('a', [
            { "key": "href", "value": href },
            { "key": "class", "value": "mdui-ripple" }
        ]);
        button.appendChild(this.element('i', [
            { "key": "class", "value": "mdui-icon material-icons" }
        ], icon));
        button.appendChild(this.element('label', [], label));
        return button;
    }
    static name(uid, username, avatar, tag) { //渲染名字
        var Name = this.element('div');
        if (!avatar) avatar = "https://gitsr.cn/oier-meet/omweb/raw/branch/master/avatar.png";
        Name.appendChild(this.element('img', [
            { "key": "src", "value": avatar },
            { "key": "alt", "value": "" },
            { "key": "style", "value": avatar_css }
        ]));
        Name.appendChild(this.element('a', [
            { "key": "href", "value": "javascript:body.home.draw('" + uid + "'); body.home.object.open();" }
        ], username));
        if (tag) Name.appendChild(this.element('span', [
            { "key": "style", "value": tag }
        ], tag));
        return Name;
    };
    static pageConfig(size, func) {
        return {
            totalCounts: 10,
            visiblePages: 10,
            currentPage: 1,
            pageSize: size,

            first: '<button class="page"><a href="javascript:void(0);"><img class = "page_img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IHJnYmEoMCwwLDAsMC42NSk7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJpY29uX3ZlcnRpY2FsX2xlZnQiIGRhdGEtbmFtZT0iaWNvbi92ZXJ0aWNhbCBsZWZ0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0xKSI+CiAgICA8cmVjdCBpZD0i55+p5b2iXzM5IiBkYXRhLW5hbWU9IuefqeW9oiAzOSIgY2xhc3M9ImNscy0xIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMSkiLz4KICAgIDxwYXRoIGlkPSLot6/lvoRfMjgiIGRhdGEtbmFtZT0i6Lev5b6EIDI4IiBjbGFzcz0iY2xzLTIiIGQ9Ik0yNTQuMTI0LDE1Ni4xaC45OTJhLjExOS4xMTksMCwwLDEsLjEyNC4xMTJ2OS42NjNhLjExOS4xMTksMCwwLDEtLjEyNC4xMTJoLS45OTJhLjExOS4xMTksMCwwLDEtLjEyNC0uMTEydi05LjY2M0EuMTE5LjExOSwwLDAsMSwyNTQuMTI0LDE1Ni4xWm03Ljg3NiwwdjEuMDE3YS40MzQuNDM0LDAsMCwxLS4xNzcuMzQ0bC00LjYzOSwzLjUyNyw0LjYzOSwzLjUyN2EuNDM0LjQzNCwwLDAsMSwuMTc3LjM0NHYxLjAxN2EuMTI1LjEyNSwwLDAsMS0uMi4wODZsLTYuNTQxLTQuOTczLDYuNTQxLTQuOTczQS4xMjUuMTI1LDAsMCwxLDI2MiwxNTYuMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTEgLTE1Mi45OTIpIi8+CiAgPC9nPgo8L3N2Zz4="></a></li>',
            prev: '<button class="page"><a href="javascript:void(0);"><img class = "page_img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IHJnYmEoMCwwLDAsMC42NSk7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJpY29uX2xlZnQiIGRhdGEtbmFtZT0iaWNvbi9sZWZ0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0xKSI+CiAgICA8cmVjdCBpZD0i55+p5b2iXzM5IiBkYXRhLW5hbWU9IuefqeW9oiAzOSIgY2xhc3M9ImNscy0xIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMSkiLz4KICAgIDxwYXRoIGlkPSLot6/lvoRfMjciIGRhdGEtbmFtZT0i6Lev5b6EIDI3IiBjbGFzcz0iY2xzLTIiIGQ9Ik0yNTQsMTQxLjg1OHYxLjAyYS4xLjEsMCwwLDEtLjE2My4wODNsLTUuNjgyLTQuNjQ2YS40MzMuNDMzLDAsMCwxLDAtLjY2NGw1LjY4Mi00LjY0NmEuMS4xLDAsMCwxLC4xNjMuMDgzdjEuMDJhLjIxNy4yMTcsMCwwLDEtLjA3Ny4xNjZsLTQuNTM4LDMuNzA3LDQuNTM4LDMuNzA5QS4yMTcuMjE3LDAsMCwxLDI1NCwxNDEuODU4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI0NCAtMTI5Ljk4NCkiLz4KICA8L2c+Cjwvc3ZnPg=="></a></li>',
            next: '<button class="page"><a href="javascript:void(0);"><img class = "page_img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IHJnYmEoMCwwLDAsMC42NSk7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJpY29uX3JpZ2h0IiBkYXRhLW5hbWU9Imljb24vcmlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEpIj4KICAgIDxyZWN0IGlkPSLnn6nlvaJfMzkiIGRhdGEtbmFtZT0i55+p5b2iIDM5IiBjbGFzcz0iY2xzLTEiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIvPgogICAgPHBhdGggaWQ9Iui3r+W+hF8yNyIgZGF0YS1uYW1lPSLot6/lvoQgMjciIGNsYXNzPSJjbHMtMiIgZD0iTTI0OCwxNDEuODU4djEuMDJhLjEuMSwwLDAsMCwuMTYzLjA4M2w1LjY4Mi00LjY0NWEuNDMzLjQzMywwLDAsMCwwLS42NjRsLTUuNjgyLTQuNjQ2YS4xLjEsMCwwLDAtLjE2My4wODN2MS4wMmEuMjE3LjIxNywwLDAsMCwuMDc3LjE2Nmw0LjUzOCwzLjcwNy00LjUzOCwzLjcwOUEuMjE3LjIxNywwLDAsMCwyNDgsMTQxLjg1OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNDQgLTEyOS45ODQpIi8+CiAgPC9nPgo8L3N2Zz4="></a></li>',
            last: '<button class="page"><a href="javascript:void(0);"><img class = "page_img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IHJnYmEoMCwwLDAsMC42NSk7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJpY29uX3ZlcnRpY2FsX3JpZ2h0IiBkYXRhLW5hbWU9Imljb24vdmVydGljYWwgcmlnaHQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEpIj4KICAgIDxyZWN0IGlkPSLnn6nlvaJfMzkiIGRhdGEtbmFtZT0i55+p5b2iIDM5IiBjbGFzcz0iY2xzLTEiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIvPgogICAgPHBhdGggaWQ9Iui3r+W+hF8yOCIgZGF0YS1uYW1lPSLot6/lvoQgMjgiIGNsYXNzPSJjbHMtMiIgZD0iTTI2MS44NzYsMTU2LjFoLS45OTJhLjExOS4xMTksMCwwLDAtLjEyNC4xMTJ2OS42NjNhLjExOS4xMTksMCwwLDAsLjEyNC4xMTJoLjk5MmEuMTE5LjExOSwwLDAsMCwuMTI0LS4xMTJ2LTkuNjYzQS4xMTkuMTE5LDAsMCwwLDI2MS44NzYsMTU2LjFabS03Ljg3NiwwdjEuMDE3YS40MzQuNDM0LDAsMCwwLC4xNzcuMzQ0bDQuNjM5LDMuNTI3LTQuNjM5LDMuNTI3YS40MzQuNDM0LDAsMCwwLS4xNzcuMzQ0djEuMDE3YS4xMjUuMTI1LDAsMCwwLC4yLjA4Nmw2LjU0MS00Ljk3My02LjU0MS00Ljk3M0EuMTI1LjEyNSwwLDAsMCwyNTQsMTU2LjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUxIC0xNTIuOTkyKSIvPgogIDwvZz4KPC9zdmc+"></a></li>',
            page: '<button class="page"><a href="javascript:void(0);"><span style="line-height: 1.2;">{{ page }}</span></a></li>',
            onPageChange: func
        };
    }
};