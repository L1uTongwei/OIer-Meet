
var head, backend, body;
var build = new class launch {
	lastRefresh = 0;
	constructor() { //构建网页
		head = window.head = new Head; //构造 <head> 标签
		head.build().catch((err) => {
			console.error(err);
			alert("文件加载错误：已停止加载，请检查网络连接。");
			throw Error("文件加载错误：已停止加载");
		}).then(() => {
			md = new window.markdownit({
				html: true
			}); //初始化 md
			body = window.body = new Body;
			backend = window.backend = new Backend; //初始化后端
			body.toolbar.tab.object.show(0);
			if (!backend.url) {
				body.servers.object.open();
				throw new Error('用户没有加入服务器，终止加载。');
			}
			backend.call("/generate_key", {}, //获取 token
				(dat) => {
					$('#luogu-verify-id-display')[0].innerText = dat.data.key;
					if (!window.localStorage.getItem("token") || window.localStorage.getItem(
							"token") == "null") {
						window.localStorage.setItem("token", dat.data.token);
					}
					$('#dia-tab-l')[0].onclick();
				}
			);
			if (window.localStorage.getItem("time") + 7 * 24 * 60 * 60 * 1000 < (new Date).getTime()) {
				backend.logout();
			}
			if (!window.localStorage.getItem("uid")) {
				var login = document.createElement("i");
				login.className = "mdui-icon material-icons";
				login.innerText = "person";
				$("#user-avatar")[0].appendChild(login);
				$('#user-avatar')[0].onclick = () => {
					$('#dia-tab-l')[0].onclick();
					body.login_register.object.open();
				};
				$("#user-avatar")[0].setAttribute('mdui-tooltip', "{content: '" + "登录" + "'}");
			} else {
				var avatar = document.createElement("img");
				avatar.style =
					"vertical-align:middle; margin-left: .4em; width: 35px; height: 35px; border-radius: 50%;";
				$("#user-avatar")[0].appendChild(avatar);
				backend.call("/get_user", {
					uid: window.localStorage.getItem("uid")
				}, (res) => {
					if (!res.data.avatar) avatar.src =
						"https://gitee.com/oier-meet-dev-team/oier-meet/raw/master/avatar.png";
					else avatar.src = res.data.avatar;
				});
				$('#user-avatar')[0].onclick = () => {
					backend.call("/get_user", {
						uid: window.localStorage.getItem("uid")
					}, (res) => {
						if (!res.data.province) res.data.province = "";
						if (!res.data.school) res.data.school = "";
						if (!res.data.avatar) res.data.avatar = "";
						if (!res.data.homepage) res.data.homepage = "";
						$('#setting-province')[0].value = res.data.province;
						$('#setting-school')[0].value = res.data.school;
						$('#setting-avatar')[0].value = res.data.avatar;
						body.setting.editor.content = res.data.homepage;
					});
					body.setting.object.open();
				};
				$("#user-avatar")[0].setAttribute('mdui-tooltip', "{content: '" + "用户设置" + "'}");
			}
			body.container.loadBackend();
			mdui.mutation();
		});
	}
};