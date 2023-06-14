class Body { //标签 <body>
	#element;
	UI;
	servers;
	login_register;
	home;
	setting;
	toolbar;
	search;
	report;
	editor;
	container;
	constructor() {
		this.#element = document.getElementsByTagName('body')[0];
		this.#element.className = "mdui-theme-primary-light-blue mdui-theme-accent-orange";
		this.refreshBackground();
		this.build();
	}
	refreshBackground() {
		if (!window.localStorage.getItem('background')) { //初始化背景图片
			window.localStorage.setItem('background', "https://cdn.luogu.com.cn/upload/image_hosting/x5084f5q.png");
		}
		document.body.style = "background-image:url('" + window.localStorage.getItem('background') +
			"'); background-attachment: fixed; background-size: cover;";
	}
	build_editor(){}
	build() {
		//编辑器对话框
		//UI 设置对话框
		this.UI = new class {
			#father;
			#element;
			object;
			constructor(fa) {
				this.#father = fa;
				this.build();
				this.bind();
			}
			build() {
				this.#element = Make.dialog(
					"ui-dialog",
					"UI 设置",
					Make.element('div', [{
							"key": "class",
							"value": "mdui-textfield"
						}], Make.element('label', [{
							"key": "class",
							"value": "mdui-textfield-label"
						}], "背景图片 URL（默认留空）").outerHTML +
						Make.element('input', [{
								"key": "class",
								"value": "mdui-textfield-input"
							},
							{
								"key": "id",
								"value": "background-url"
							}
						]).outerHTML
					).outerHTML,
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "mdui-dialog-cancel",
							"value": ""
						}
					], '关闭').outerHTML +
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "mdui-dialog-confirm",
							"value": ""
						},
						{
							"key": "id",
							"value": "ui-submit"
						}
					], '提交').outerHTML
				);
				this.#father.appendChild(this.#element);
				this.object = new mdui.Dialog(this.#element);
			}
			bind() {
				$('#ui-submit')[0].onclick = () => {
					var url = $('#background-url')[0].value;
					if (!url) url = "https://cdn.luogu.com.cn/upload/image_hosting/x5084f5q.png";
					window.localStorage.setItem('background', url);
					Backend.tips({
						"msg": "操作成功"
					});
				};
			}
		}(this.#element);
		//社区服务器浏览器对话框
		this.servers = new class {
			#father;
			#element;
			object;
			constructor(fa) {
				this.#father = fa;
				this.build();
				this.bind();
			}
			build() {
				this.#element = Make.dialog(
					"server-dialog",
					"社区服务器浏览器",
					Make.element('div', [{
						"key": "class",
						"value": "mdui-table-fluid"
					}], Make.element('table', [{
							"key": "class",
							"value": "mdui-table"
						}], Make.element('thead', [],
							Make.element('tr', [],
								Make.element('th', [], '服务器描述').outerHTML +
								Make.element('th', [], '服务器维护者').outerHTML +
								Make.element('th', [], '操作').outerHTML
							).outerHTML
						).outerHTML +
						Make.element('tbody', [{
							"key": "id",
							"value": "servers_body"
						}]).outerHTML
					).outerHTML).outerHTML +
					Make.element('div', [{
						"key": "class",
						"value": "mdui-textfield"
					}], Make.element('input', [{
							"key": "class",
							"value": "mdui-textfield-input"
						},
						{
							"key": "type",
							"value": "text"
						},
						{
							"key": "placeholder",
							"value": "自定义API地址"
						},
						{
							"key": "id",
							"value": "input-API"
						}
					]).outerHTML).outerHTML +
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
						},
						{
							"key": "id",
							"value": "join"
						}
					], "加入服务器").outerHTML,
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "mdui-dialog-cancel",
							"value": ""
						}
					]).outerHTML
				);
				this.#father.appendChild(this.#element);
				this.object = new mdui.Dialog(this.#element);
			}
			bind() {
				var servers = res.split('\n');
				for (var i = 0; i < servers.length; i++) {
					var server = servers[i].split(' ');
					var tr = Make.element('tr', [],
						Make.element('td', [], server[0]).outerHTML +
						Make.element('td', [], server[1]).outerHTML +
						Make.element('td', [],
							Make.element('a', [{
									"key": "class",
									"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
								},
								{
									"key": "href",
									"value": server[2]
								}
							], "查看详情").outerHTML + " " +
							Make.element('button', [{
									"key": "class",
									"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
								},
								{
									"key": "onclick",
									"value": "backend.changeAPI('" + server[3] + "');"
								},
								{
									"key": "mdui-dialog-cancel",
									"value": ""
								}
							], "加入服务器").outerHTML
						).outerHTML
					);
					$('#servers_body')[0].appendChild(tr);
				}
				$('#join')[0].onclick = () => {
					backend.changeAPI($('#input-API')[0].value);
				};
			}
		}(this.#element);
		//注册与登录对话框
		this.login_register = new class {
			#father;
			#element;
			object;
			objectTAB;
			#flgRegister = false;
			constructor(fa) {
				this.#father = fa;
				this.build();
				this.bind();
			}
			build() {
				this.#element = Make.dialog(
					'lr-dialog',
					Make.element('span', [{
						"key": "id",
						"value": "dialog-title-action"
					}], "登录 OIer Meet!").outerHTML +
					Make.element('div', [{
								"key": "class",
								"value": "mdui-tab mdui-tab-centered mdui-tab-active"
							},
							{
								"key": "id",
								"value": "dialog-tab"
							},
							{
								"key": "mdui-tab",
								"value": ""
							}
						], Make.element('a', [{
								"key": "id",
								"value": "dia-tab-l"
							},
							{
								"key": "class",
								"value": "mdui-ripple"
							}
						], "登录").outerHTML +
						Make.element('a', [{
								"key": "id",
								"value": "dia-tab-r"
							},
							{
								"key": "class",
								"value": "mdui-ripple"
							}
						], "注册").outerHTML
					).outerHTML,
					Make.element('div', [{
								"key": "class",
								"value": "mdui-container"
							},
							{
								"key": "id",
								"value": "dialog-login-register-page-login"
							}
						], Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield mdui-textfield-floating-label"
							}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-username"
								}
							], "用户名").outerHTML +
							Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "id",
									"value": "in-username"
								}
							]).outerHTML
						).outerHTML +
						Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield mdui-textfield-floating-label"
							}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-password"
								}
							], "密码").outerHTML +
							Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "id",
									"value": "in-password"
								},
								{
									"key": "type",
									"value": "password"
								}
							]).outerHTML
						).outerHTML +
						Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield mdui-textfield-floating-label"
							}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-captcha"
								}
							], "验证码").outerHTML +
							Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "id",
									"value": "in-captcha"
								},
							]).outerHTML
						).outerHTML +
						Make.element('div', [{
								"key": "class",
								"value": "mdui-img-fluid"
							},
							{
								"key": "id",
								"value": "login-captcha-img"
							}
						]).outerHTML +
						Make.element('a', [{
							"key": "onclick",
							"value": "backend.refreshCaptcha('#login-captcha-img');"
						}, ], "看不清？换一张").outerHTML
					).outerHTML +
					Make.element('div', [{
								"key": "class",
								"value": "mdui-container"
							},
							{
								"key": "id",
								"value": "dialog-login-register-page-register"
							}
						], Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield mdui-textfield-floating-label"
							}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-r-username"
								}
							], "用户名").outerHTML +
							Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "id",
									"value": "in-r-username"
								}
							]).outerHTML
						).outerHTML +
						Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield mdui-textfield-floating-label"
							}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-r-password"
								}
							], "密码").outerHTML +
							Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "id",
									"value": "in-r-password"
								},
								{
									"key": "type",
									"value": "password"
								}
							]).outerHTML
						).outerHTML +
						Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield mdui-textfield-floating-label"
							}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-r-lgverify"
								}
							], "洛谷验证剪贴板").outerHTML +
							Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "id",
									"value": "in-r-lgverify"
								},
							]).outerHTML
						).outerHTML +
						Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-r-lgverify-info"
								}
							], "请用您需要绑定的洛谷账号创建一个公开的云剪贴板，内容为" +
							Make.element('br').outerHTML +
							Make.element('span', [{
									"key": "style",
									"value": "font-weight:800;"
								},
								{
									"key": "id",
									"value": "luogu-verify-id-display"
								}
							]).outerHTML +
							Make.element('br').outerHTML +
							"并将云剪贴板地址后 8 个字符填入上方的文本框"
						).outerHTML +
						Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield mdui-textfield-floating-label"
							}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								},
								{
									"key": "id",
									"value": "lab-r-captcha"
								}
							], "验证码").outerHTML +
							Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "id",
									"value": "in-r-captcha"
								},
							]).outerHTML
						).outerHTML +
						Make.element('div', [{
								"key": "class",
								"value": "mdui-img-fluid"
							},
							{
								"key": "id",
								"value": "register-captcha-img"
							}
						]).outerHTML +
						Make.element('a', [{
							"key": "onclick",
							"value": "backend.refreshCaptcha('#register-captcha-img');"
						}, ], "看不清？换一张").outerHTML
					).outerHTML,
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "id",
							"value": "dialog-btn-cancel"
						},
						{
							"key": "mdui-dialog-cancel",
							"value": ""
						}
					], '取消').outerHTML +
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "mdui-dialog-confirm",
							"value": ""
						},
						{
							"key": "id",
							"value": "dialog-btn-ok"
						}
					], '提交').outerHTML
				);
				this.#father.appendChild(this.#element);
				this.object = new mdui.Dialog(this.#element);
				this.objectTAB = new mdui.Tab("#dialog-tab");
			}
			bind() {
				this.#flgRegister = false;
				$('#dia-tab-l')[0].onclick = () => {
					$('#dialog-title-action')[0].innerText = "登录 OIer-Meet!";
					$('#dialog-login-register-page-login')[0].style.display = "block";
					$('#dialog-login-register-page-register')[0].style.display = "none";
					this.#flgRegister = false;
					$('#dialog-btn-ok')[0].innerText = "登录";
					backend.refreshCaptcha("#login-captcha-img");
				};
				$('#dia-tab-r')[0].onclick = () => {
					$('#dialog-title-action')[0].innerText = "注册 OIer-Meet!";
					$('#dialog-login-register-page-login')[0].style.display = "none";
					$('#dialog-login-register-page-register')[0].style.display = "block";
					this.#flgRegister = true;
					$('#dialog-btn-ok')[0].innerText = "注册";
					backend.refreshCaptcha("#register-captcha-img");
				};
				$('#dialog-btn-ok')[0].onclick = () => {
					var action = (res) => {
						if (res.status == 200) {
							window.localStorage.setItem("uid", res.data.uid);
							window.localStorage.setItem("operator", res.data.operator);
							window.localStorage.setItem("time", (new Date).getTime());
						}
						var msg = res.msg;
						if (!msg) msg = res.data.msg;
						mdui.snackbar({
							message: msg,
							timeout: 500,
							onClosed: () => {
								setTimeout(() => {
									location.reload();
								}, 500);
							}
						});
					};
					if (!this.#flgRegister) {
						backend.call("/login", {
							username: $('#in-username')[0].value,
							password: $('#in-password')[0].value,
							verify: $('#in-captcha')[0].value
						}, action);
					} else {
						backend.call("/register", {
							username: $('#in-r-username')[0].value,
							password: $('#in-r-password')[0].value,
							verify: $('#in-r-captcha')[0].value,
							link: $('#in-r-lgverify')[0].value
						}, action);
					}
				};
			}
		}(this.#element);
		//用户主页对话框
		this.home = new class {
			#father;
			#element;
			object;
			constructor(fa) {
				this.#father = fa;
				this.build();
			}
			build() {
				this.#element = Make.dialog(
					"home-dialog",
					"用户主页",
					"",
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "mdui-dialog-cancel",
							"value": ""
						}
					], "关闭").outerHTML
				);
				this.#father.appendChild(this.#element);
				this.object = new mdui.Dialog(this.#element);
			}
			draw(uid) { //渲染个人主页
				backend.call("/get_user", {
					uid: uid
				}, (res) => {
					if (!res.data.homepage) res.data.homepage = "该用户未填写主页内容";
					$("#home-dialog-content")[0].innerHTML = md.render(res.data.homepage);
					renderMathInElement($("#home-dialog-content")[0], katex_config);
					this.object.handleUpdate();
				});
			}
		}(this.#element);
		//用户设置对话框
		this.setting = new class {
			#father;
			#element;
			object;
			editor;
			constructor(fa) {
				this.#father = fa;
				this.build();
				this.bind();
			}
			build() {
				this.#element = Make.dialog(
					"setting-dialog",
					"用户设置",
					Make.element('div', [{
							"key": "class",
							"value": "mdui-textfield"
						}], Make.element('label', [{
							"key": "class",
							"value": "mdui-textfield-label"
						}], "省份（匿名留空）").outerHTML +
						Make.element('input', [{
								"key": "class",
								"value": "mdui-textfield-input"
							},
							{
								"key": "id",
								"value": "setting-province"
							}
						]).outerHTML
					).outerHTML +
					Make.element('div', [{
							"key": "class",
							"value": "mdui-textfield"
						}], Make.element('label', [{
							"key": "class",
							"value": "mdui-textfield-label"
						}], "学校（匿名留空）").outerHTML +
						Make.element('input', [{
								"key": "class",
								"value": "mdui-textfield-input"
							},
							{
								"key": "id",
								"value": "setting-school"
							}
						]).outerHTML
					).outerHTML +
					Make.element('div', [{
							"key": "class",
							"value": "mdui-textfield"
						}], Make.element('label', [{
							"key": "class",
							"value": "mdui-textfield-label"
						}], "头像URL地址").outerHTML +
						Make.element('input', [{
								"key": "class",
								"value": "mdui-textfield-input"
							},
							{
								"key": "id",
								"value": "setting-avatar"
							}
						]).outerHTML
					).outerHTML +
					Make.element('label', [{
						"key": "class",
						"value": "mdui-textfield-label"
					}], "主页Markdown").outerHTML +
					Make.element('div', [{
						"key": "class",
						"value": "editor_css"
					}], Make.element('div', [{
						"key": "id",
						"value": "setting-editor-container"
					}, ]).outerHTML).outerHTML,
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "mdui-dialog-cancel",
							"value": ""
						}
					], "关闭").outerHTML +
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "id",
							"value": "mylogout"
						}
					], "注销").outerHTML +
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "id",
							"value": "setting-submit"
						},
						{
							"key": "mdui-dialog-confirm",
							"value": ""
						}
					], "提交").outerHTML
				);
				this.#father.appendChild(this.#element);
				this.object = new mdui.Dialog(this.#element);
			}
			bind() {
				this.editor = new MarkdownPalettes("#setting-editor-container");
				$('#mylogout')[0].onclick = () => {
					backend.call("/logout");
					backend.logout();
					Backend.tips({
						"msg": "操作成功"
					});
				};
				$('#setting-submit')[0].onclick = () => {
					backend.call("/user_setting", {
						province: $('#setting-province')[0].value,
						school: $('#setting-school')[0].value,
						avatar: $('#setting-avatar')[0].value,
						homepage: this.editor.content
					}, Backend.tips);
				};
			}
		}(this.#element);
		//举报
		this.report = new class {
			#element;
			#father;
			object;
			constructor(fa) {
				this.#father = fa;
				this.build();
				this.bind();
			}
			build() {
				this.#element = Make.dialog(
					"report-dialog",
					"举报",
					Make.element('label', [{
							"key": "class",
							"value": "mdui-radio"
						}], Make.element('input', [{
								"key": "type",
								"value": "radio"
							},
							{
								"key": "name",
								"value": "report-type"
							},
							{
								"key": "value",
								"value": "用户举报"
							},
							{
								"key": "checked",
								"value": ""
							}
						]).outerHTML +
						Make.element('i', [{
							"key": "class",
							"value": "mdui-radio-icon"
						}]).outerHTML +
						"用户举报"
					).outerHTML +
					Make.element('label', [{
							"key": "class",
							"value": "mdui-radio"
						}], Make.element('input', [{
								"key": "type",
								"value": "radio"
							},
							{
								"key": "name",
								"value": "report-type"
							},
							{
								"key": "value",
								"value": "帖子举报"
							}
						]).outerHTML +
						Make.element('i', [{
							"key": "class",
							"value": "mdui-radio-icon"
						}]).outerHTML +
						"帖子举报"
					).outerHTML +
					Make.element('div', [{
							"key": "class",
							"value": "mdui-textfield"
						}], Make.element('label', [{
							"key": "class",
							"value": "mdui-textfield-label"
						}], "ID").outerHTML +
						Make.element('input', [{
								"key": "class",
								"value": "mdui-textfield-input"
							},
							{
								"key": "id",
								"value": "report-id"
							}
						]).outerHTML
					).outerHTML +
					Make.element('div', [{
							"key": "class",
							"value": "mdui-textfield"
						}], Make.element('label', [{
							"key": "class",
							"value": "mdui-textfield-label"
						}], "举报理由").outerHTML +
						Make.element('input', [{
								"key": "class",
								"value": "mdui-textfield-input"
							},
							{
								"key": "id",
								"value": "report-note"
							}
						]).outerHTML
					).outerHTML,
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "mdui-dialog-cancel",
							"value": ""
						}
					], "关闭").outerHTML +
					Make.element('button', [{
							"key": "class",
							"value": "mdui-btn mdui-ripple"
						},
						{
							"key": "id",
							"value": "report-submit"
						},
						{
							"key": "mdui-dialog-confirm",
							"value": ""
						}
					], "提交").outerHTML
				);
				this.#father.appendChild(this.#element);
				this.object = new mdui.Dialog(this.#element);
			}
			bind() {
				$('#report-submit')[0].onclick = () => {
					backend.call("/report", {
						"type": $("#radioDiv input[name='report-type']:checked").val(),
						"bid": $('#report-id')[0].value,
						"note": $('#report-note')[0].value
					}, Backend.tips);
				};
			}
		}(this.#element);
		//顶部工具栏
		this.toolbar = new class {
			#father;
			#element;
			tab;
			constructor(fa) {
				this.#father = fa;
				this.build();
				this.bind();
				this.initTab();
			}
			initTab() {
				//Tab 选项卡
				this.tab = new class {
					#father;
					#element;
					object;
					constructor(fa) {
						this.#father = fa;
						this.build();
					}
					build() {
						var op = "";
						if (window.localStorage.getItem('operator')) op = Make.tabButton(
							'#management', "account_balance", "管理后台").outerHTML;
						this.#element = Make.element('div', [{
									"key": "class",
									"value": "mdui-tab mdui-color-light-blue-300"
								},
								{
									"key": "style",
									"value": "opacity: 0.9"
								},
								{
									"key": "mdui-tab",
									"value": ""
								}
							], Make.tabButton("#homepage", "home", "首页").outerHTML +
							Make.tabButton("#userlist", "list", "用户列表").outerHTML +
							Make.tabButton("#practice", "book", "Codeforces 练习").outerHTML +
							Make.tabButton("#discuss", "forum", "社区").outerHTML +
							Make.tabButton("#hole", "streetview", "无人树洞").outerHTML +
							Make.tabButton('#log', "content_paste", "管理日志").outerHTML +
							op +
							Make.tabButton("#about", "info", "关于").outerHTML);
						this.#father.appendChild(this.#element);
						this.object = new mdui.Tab(this.#element);
					}
				}(this.#element);
			}
			build() {
				this.#element = Make.element('div', [{
						"key": "id",
						"value": "bar"
					},
					{
						"key": "class",
						"value": "mdui-appbar"
					}
				], Make.element('div', [{
							"key": "style",
							"value": "opacity: 0.9; z-index: 0;"
						},
						{
							"key": "class",
							"value": "mdui-toolbar mdui-color-light-blue-300"
						},
						{
							"key": "id",
							"value": "toolbar"
						}
					], Make.element('a', [{
							"key": "href",
							"value": "javascript:Backend.tips({\"msg\": \"刷新成功\"});"
						},
						{
							"key": "class",
							"value": "mdui-typo-title"
						}
					], "OIer Meet!").outerHTML +
					Make.element('div', [{
						"key": "class",
						"value": "mdui-toolbar-spacer"
					}]).outerHTML +
					Make.toolbarButton("javascript:Backend.tips({\"msg\": \"刷新成功\"});", "refresh",
						"刷新").outerHTML +
					Make.toolbarButton("javascript:body.report.object.open();", "report", "举报")
					.outerHTML +
					Make.toolbarButton("javascript:body.UI.object.open();", "settings", "UI 设置")
					.outerHTML +
					Make.toolbarButton("javascript:body.servers.object.open();", "dns", "社区服务器浏览器")
					.outerHTML +
					Make.toolbarButton("javascript:;", "", "", "user-avatar").outerHTML
				).outerHTML);
				this.#father.appendChild(this.#element);
			}
			bind() {
				$('#user-avatar')[0].className = "mdui-btn mdui-btn-icon";
			}
		}(this.#element);
		//container div
		this.container = new class {
			#element;
			#father;
			homepage;
			about;
			hole;
			userlist;
			discuss;
			log;
			management;
			practice;
			constructor(fa) {
				this.#father = fa;
				this.build();
				this.initHomepage();
				this.initUserlist();
				this.initPractice();
				this.initDiscuss();
				this.initHole();
				this.initLog();
				this.initManagement();
				this.initAbout();
			}
			initHomepage() {
				//首页
				this.homepage = new class {
					#element;
					#father;
					constructor(fa) {
						this.#father = fa;
						this.build();
					}
					build() {
						this.#element = Make.element('div', [{
								"key": "id",
								"value": "homepage"
							},
							{
								"key": "class",
								"value": "mdui-p-a-5"
							}
						]);
						this.#father.appendChild(this.#element);
					}
					bind() {
						$.get(backend.url + "/intro", (res) => {
							$("#homepage")[0].innerHTML = md.render(res);
						});
					}
				}(this.#element);
			}
			initAbout() {
				//关于页
				this.about = new class {
					#element;
					#father;
					constructor(fa) {
						this.#father = fa;
						this.build();
						this.bind();
					}
					build() {
						this.#element = Make.element('div', [{
								"key": "id",
								"value": "about"
							},
							{
								"key": "class",
								"value": "mdui-p-a-5"
							}
						]);
						this.#father.appendChild(this.#element);
					}
					bind() {
						$("#about")[0].innerHTML = md.render(about);
					}
				}(this.#element);
			}
			initHole() {
				//无人树洞
				this.hole = new class {
					#element;
					#father;
					constructor(fa) {
						this.#father = fa;
						this.build();
						this.bind();
					}
					build() {
						this.#element = Make.element('div', [{
									"key": "id",
									"value": "hole"
								},
								{
									"key": "class",
									"value": "mdui-p-a-5"
								}
							], Make.element('textarea', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "type",
									"value": "text"
								},
								{
									"key": "placeholder",
									"value": "Say here~"
								},
								{
									"key": "id",
									"value": "word"
								}
							]).outerHTML +
							Make.element('a', [{
									"key": "id",
									"value": "hole-go"
								},
								{
									"key": "class",
									"value": "mdui-btn mdui-btn-raised"
								}
							], "Biu~").outerHTML
						);
						this.#father.appendChild(this.#element);
					}
					bind() {
						$('#hole-go')[0].onclick = () => {
							$('#word')[0].value = '';
							var rand = Math.floor(Math.random() * words.length);
							var rvalue = words[rand];
							mdui.dialog({
								title: 'hi，你收到了一条祝福',
								content: rvalue,
								buttons: [{
									text: '确认'
								}]
							});
						};
					}
				}(this.#element);
			}
			initUserlist() {
				//用户列表
				this.userlist = new class {
					#element;
					#father;
					constructor(fa) {
						this.#father = fa;
						this.build();
					}
					build() {
						this.#element = Make.element('div', [{
									"key": "class",
									"value": "mdui-p-a-5"
								},
								{
									"key": "id",
									"value": "userlist"
								}
							], Make.element('label', [{
									"key": "class",
									"value": "mdui-radio"
								}], Make.element('input', [{
										"key": "type",
										"value": "radio"
									},
									{
										"key": "name",
										"value": "search-radio"
									},
									{
										"key": "value",
										"value": "uid"
									},
									{
										"key": "checked",
										"value": ""
									}
								]).outerHTML +
								Make.element('i', [{
									"key": "class",
									"value": "mdui-radio-icon"
								}]).outerHTML +
								"搜索 UID"
							).outerHTML +
							Make.element('label', [{
									"key": "class",
									"value": "mdui-radio"
								}], Make.element('input', [{
										"key": "type",
										"value": "radio"
									},
									{
										"key": "name",
										"value": "search-radio"
									},
									{
										"key": "value",
										"value": "username"
									}
								]).outerHTML +
								Make.element('i', [{
									"key": "class",
									"value": "mdui-radio-icon"
								}]).outerHTML +
								"搜索用户名"
							).outerHTML +
							Make.element('label', [{
									"key": "class",
									"value": "mdui-radio"
								}], Make.element('input', [{
										"key": "type",
										"value": "radio"
									},
									{
										"key": "name",
										"value": "search-radio"
									},
									{
										"key": "value",
										"value": "lgusername"
									}
								]).outerHTML +
								Make.element('i', [{
									"key": "class",
									"value": "mdui-radio-icon"
								}]).outerHTML +
								"搜索洛谷用户名"
							).outerHTML +
							Make.element('div', [{
									"key": "class",
									"value": "mdui-textfield"
								}], Make.element('label', [{
									"key": "class",
									"value": "mdui-textfield-label"
								}], "请输入搜索内容").outerHTML +
								Make.element('input', [{
										"key": "class",
										"value": "mdui-textfield-input"
									},
									{
										"key": "id",
										"value": "search-content"
									}
								]).outerHTML
							).outerHTML +
							Make.element('a', [{
									"key": "id",
									"value": "search"
								},
								{
									"key": "class",
									"value": "mdui-btn mdui-btn-raised mdui-color-theme-accent"
								},
								{
									"key": "onclick",
									"value": "body.container.userlist.search()"
								}
							], "搜索").outerHTML +
							Make.element('br').outerHTML +
							Make.element('br').outerHTML +
							Make.element('div', [{
								"key": "class",
								"value": "mdui-table-fluid"
							}], Make.element('table', [{
									"key": "class",
									"value": "mdui-table"
								}], Make.element('thead', [],
									Make.element('tr', [],
										Make.element('th', [], "UID").outerHTML +
										Make.element('th', [], "用户名").outerHTML +
										Make.element('th', [], "省份及学校").outerHTML +
										Make.element('th', [], "洛谷用户名").outerHTML +
										Make.element('th', [], "管理员").outerHTML +
										Make.element('th', [], "是否被封禁").outerHTML +
										Make.element('th', [], "注册时间").outerHTML
									).outerHTML
								).outerHTML +
								Make.element('tbody', [{
									"key": "id",
									"value": "userlist_body"
								}]).outerHTML
							).outerHTML).outerHTML +
							Make.element('br').outerHTML +
							Make.element('div', [{
								"key": "id",
								"value": "userlist-page"
							}]).outerHTML
						);
						this.#father.appendChild(this.#element);
					}
					updateUserlist(page) { //用户列表
						$('#userlist_body')[0].innerHTML = "";
						backend.call("/get_userlist", {
							"page": page
						}, (res) => {
							for (var i = 0; i < res.data.length; i++) {
								if (!res.data[i].province) res.data[i].province = "";
								if (!res.data[i].school) res.data[i].school = "";
								if (!res.data[i].avatar) res.data[i].avatar =
									"https://gitee.com/oier-meet-dev-team/oier-meet/raw/master/avatar.png";
								$('#userlist_body')[0].appendChild(((data) => {
									return Make.element('tr', [],
										Make.element('td', [], data._id)
										.outerHTML +
										Make.element('td', [], Make.name(
												data._id, data.username,
												data.avatar, data.tag)
											.outerHTML).outerHTML +
										Make.element('td', [], data
											.province + ' ' + data.school)
										.outerHTML +
										Make.element('td', [],
											Make.element('a', [{
												"key": "href",
												"value": "https://www.luogu.com.cn/user/" +
													data.luogu_uid
											}], data.luogu_username)
											.outerHTML
										).outerHTML +
										Make.element('td', [], data
											.operator).outerHTML +
										Make.element('td', [], data.banned)
										.outerHTML +
										Make.element('td', [], data
											.register_time).outerHTML
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
					}
					search() {
						backend.call("/search", {
							"type": $("#radioDiv input[name='search-radio']:checked").val(),
							"content": $('#search-content')[0].value
						}, (res) => {
							if (res.status == 200) {
								var searched = Make.element('a', [{
									"key": "name",
									"value": "searched"
								}], this.addUserlist(res.data));
								$('#userlist_body')[0].appendChild(searched);
								searched.scrollIntoView({
									behavior: 'smooth'
								});
							}
						});
					}
				}(this.#element);
			}
			initPractice() {
				this.practice = new class {
					#father;
					#element;
					object;
					constructor(fa) {
						this.#father = fa;
						this.build();
					}
					build() {
						this.#element = Make.element()
					}
				}(this.#element);
			}
			initDiscuss() {
				this.discuss = new class {
					#father;
					#element;
					object;
					#pages = new Map();
					#panels = new Map();
					constructor(fa) {
						this.#father = fa;
						this.build();
					}
					build() {
						this.#element = Make.element('div', [{
									"key": "id",
									"value": "discuss"
								},
								{
									"key": "style",
									"value": "padding: 40px;"
								}
							], Make.element('br').outerHTML +
							Make.element('div', [{
									"key": "class",
									"value": "mdui-panel"
								},
								{
									"key": "id",
									"value": "discuss_body"
								},
							]).outerHTML +
							Make.element('br').outerHTML +
							Make.element('div', [{
								"key": "id",
								"value": "discuss-page"
							}]).outerHTML +
							Make.element('div', [{
								"key": "class",
								"value": "mdui-textfield"
							}], Make.element('input', [{
									"key": "class",
									"value": "mdui-textfield-input"
								},
								{
									"key": "type",
									"value": "text"
								},
								{
									"key": "placeholder",
									"value": "帖子标题"
								},
								{
									"key": "id",
									"value": "topic"
								}
							]).outerHTML).outerHTML +
							Make.element('br').outerHTML +
							Make.element('button', [{
									"key": "class",
									"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
								},
								{
									"key": "id",
									"value": "new-post"
								}
							], "编辑内容并发表帖子").outerHTML +
							Make.element('br').outerHTML +
							Make.element('br').outerHTML
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
								backend.call("/send_contents", {
									topic: topic,
									message: content
								}, Backend.tips);
							}
							body.editor.object.open();
						};
						$('#discuss-page').jqPaginator(Make.pageConfig(20, this.updateDiscuss));
					}
					getSignlePost(id, myid, msg, avatar, username, tag, send_time, top = false, reply =
						false) { //渲染单个帖子
						var extra = Make.element('script').outerHTML,
							extra2 = "",
							extra3 = "";
						var img = "",
							notop = "";
						if (tag)
							extra = Make.element('span', [{
								"key": "class",
								"value": "border-radius: 2px; background-color: #8e44ad;"
							}], tag);
						if (avatar)
							img = Make.element('img', [{
									"key": "class",
									"value": "mdui-card-header-avatar"
								},
								{
									"key": "src",
									"value": avatar
								}
							]).outerHTML;
						if (!top) {
							extra3 = Make.element('div', [{
										"key": "class",
										"value": "mdui-panel"
									},
									{
										"key": "mdui-panel",
										"value": ""
									},
									{
										"key": "id",
										"value": "reply-panel-" + myid
									}
								], Make.element('div', [{
										"key": "class",
										"value": "mdui-panel-item"
									}], Make.element('div', [{
										"key": "class",
										"value": "mdui-panel-item-header"
									}], "点击展开回复").outerHTML +
									Make.element('div', [{
											"key": "class",
											"value": "mdui-panel-item-body"
										}], Make.element('div', [{
											"key": "id",
											"value": "reply-body-" + myid
										}]).outerHTML +
										Make.element('div', [{
											"key": "id",
											"value": "reply-page-" + myid
										}]).outerHTML
									).outerHTML
								).outerHTML).outerHTML +
								Make.element('br').outerHTML;
							extra2 = Make.element('div', [{
									"key": "class",
									"value": "mdui-card-actions"
								}], Make.element('button', [{
										"key": "class",
										"value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"
									},
									{
										"key": "onclick",
										"value": "(" + ((id) => {
											$("#editor-submit")[0].onclick = () => {
												window.backend.call(
													'/reply_replies', {
														"father": id,
														"message": window
															.body.editor
															.editor.content
													}, Backend.tips);
											};
											window.body.editor.object.open();
										}).toString() + ")('" + id + "')"
									}
								], "回复该评论").outerHTML +
								Make.element('button', [{
										"key": "class",
										"value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"
									},
									{
										"key": "onclick",
										"value": "(" + ((id) => {
											window.backend.call('/delete_replies', {
												"id": id,
											}, Backend.tips);
										}).toString() + ")('" + myid + "')"
									}
								], "删除回复").outerHTML
							).outerHTML;
						} else if (reply) {
							extra2 = Make.element('div', [{
									"key": "class",
									"value": "mdui-card-actions"
								}], Make.element('button', [{
										"key": "class",
										"value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"
									},
									{
										"key": "onclick",
										"value": "(" + ((id, username) => {
												$("#editor-submit")[0].onclick = () => {
													window.backend.call(
														'/reply_replies', {
															"father": id,
															"message": window
																.body.editor
																.editor.content
														}, Backend.tips);
												};
												window.body.editor.editor.content =
													"回复 **@" + username + "**：";
												window.body.editor.object.open();
											}).toString() + ")('" + id + "', '" + username +
											"')"
									}
								], "回复二层评论").outerHTML +
								Make.element('button', [{
										"key": "class",
										"value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"
									},
									{
										"key": "onclick",
										"value": "(" + ((id) => {
											window.backend.call('/delete_reply', {
												"id": id,
											}, Backend.tips);
										}).toString() + ")('" + myid + "')"
									}
								], "删除评论").outerHTML
							).outerHTML;
						}
						var id_str = id ? "ID: " + id + " " : "";
						return Make.element('div', [{
								"key": "class",
								"value": "mdui-card"
							}], Make.element('div', [{
									"key": "class",
									"value": "mdui-card-header"
								}], img +
								Make.element('div', [{
									"key": "class",
									"value": "mdui-card-header-title"
								}, ], username + extra).outerHTML +
								Make.element('div', [{
									"key": "class",
									"value": "mdui-card-header-subtitle"
								}, ], send_time).outerHTML
							).outerHTML +
							Make.element('div', [{
								"key": "class",
								"value": "mdui-card-content"
							}], md.render(msg) + extra3).outerHTML +
							extra2
						);
					};
					showReply(fid, id, page) { //渲染二层回复
						backend.call("/get_repliesonlist", {
							father: fid,
							page: page
						}, ((fid, id) => {
							return (res) => {
								for (var i = 0; i < res.data.length; i++) {
									$('#reply-body-' + id)[0].appendChild(
										this.getSignlePost(
											id, res.data[i]._id, res.data[i]
											.message, res.data[i].sender.avatar,
											res.data[i].sender.username,
											res.data[i].sender.tag, res.data[i]
											.send_time, true, true
										)
									);
									mdui.mutation();
								}
							};
						})(fid, id));
					}
					showPost(id, page) { //渲染帖子
						backend.call("/get_contents", {
							id: id
						}, ((id) => {
							return (res) => { //加载主内容
								$('#content-' + id)[0].appendChild(this
									.getSignlePost(
										res.data[0]._id, res.data[0]._id, res
										.data[0].message, res.data[0].sender
										.avatar, res.data[0].sender.username,
										res.data[0].sender.tag,
										res.data[0].send_time, true
									)
								);
								backend.call("/get_replieslist", {
									father: id,
									page: page
								}, ((id) => {
									return (res) => {
										if (res.data == undefined)
											return;
										for (var i = 0; i < res.data
											.length; i++) {
											$('#content-' + id)[0]
												.appendChild(Make
													.element('br'));
											$('#content-' + id)[0]
												.appendChild(this
													.getSignlePost(
														id, res
														.data[i]
														._id, res
														.data[i]
														.message,
														res.data[i]
														.sender
														.avatar, res
														.data[i]
														.sender
														.username,
														res.data[i]
														.sender.tag,
														res.data[i]
														.send_time
													)
												);
											this.#panels.set(res
												.data[i]._id,
												new mdui.Panel(
													'#reply-panel-' +
													res.data[i]
													._id));
											$('#reply-page-' + res
													.data[i]._id)
												.jqPaginator(
													Make.pageConfig(
														20, ((id,
																fid
																) => {
																return (
																	num) => {
																	if (this
																		.#pages
																		.get(
																			id
																			) ==
																		num
																		)
																		return;
																	this.showReply(
																		fid,
																		id,
																		num
																		);
																	this.#pages
																		.set(
																			id,
																			num
																			);
																}
															})(res
															.data[i]
															._id, id
															))
												);
										}
										$('#content-' + id)[0]
											.innerHTML +=
											Make.element('br')
											.outerHTML +
											Make.element('div', [{
												"key": "id",
												"value": "reply-" +
													id
											}]).outerHTML +
											Make.element('br')
											.outerHTML +
											Make.element('div', [{
													"key": "class",
													"value": "mdui-panel-item-actions"
												}], Make.element(
													'button', [{
															"key": "class",
															"value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"
														},
														{
															"key": "onclick",
															"value": "(" +
																((id) => {
																	$("#editor-submit")[
																			0
																			]
																		.onclick =
																		() => {
																			window
																				.backend
																				.call(
																					"/reply_contents", {
																						"father": id,
																						"message": window
																							.body
																							.editor
																							.editor
																							.content
																					},
																					Backend
																					.tips
																					);
																		};
																	window
																		.body
																		.editor
																		.object
																		.open();
																})
																.toString() +
																")('" +
																id +
																"')"
														}
													], "回复该贴")
												.outerHTML +
												Make.element(
													'button', [{
															"key": "class",
															"value": "mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent"
														},
														{
															"key": "onclick",
															"value": "(" +
																((id) => {
																	window
																		.backend
																		.call(
																			"/delete_contents", {
																				"id": id
																			},
																			Backend
																			.tips
																			);
																})
																.toString() +
																")('" +
																id +
																"')"
														}
													], "删除")
												.outerHTML
											).outerHTML +
											Make.element('br')
											.outerHTML +
											Make.element('div', [{
												"key": "id",
												"value": id +
													"-page"
											}]).outerHTML;
										this.#pages.set(id, 1);
										$('#' + id + '-page')
											.jqPaginator(
												Make.pageConfig(20,
													((id) => {
														return (
															num) => {
															if (this
																.#pages
																.get(
																	id
																	) ==
																num
																)
																return;
															this.showPost(
																id,
																num
																);
															this.#pages
																.get(
																	id
																	) =
																num;
														}
													})(id))
											);
									}
								})(id));
							}
						})(id));
					};
					updateDiscuss = (page) => { //社区
						backend.call("/get_contentslist", {
							page: page
						}, (res) => {
							for (var i = 0; i < res.data.length; i++) {
								var panel = Make.element('div', [{
										"key": "class",
										"value": "mdui-panel-item"
									}], Make.element('div', [{
											"key": "class",
											"value": "mdui-panel-item-header"
										}], Make.element('div', [{
											"key": "class",
											"value": "mdui-panel-item-title"
										}], res.data[i].topic).outerHTML +
										Make.element('div', [{
											"key": "class",
											"value": "mdui-panel-item-summary"
										}], "ID：" + res.data[i]._id).outerHTML +
										Make.element('div', [{
											"key": "class",
											"value": "mdui-panel-item-summary"
										}], "发送者：" + Make.name(res.data[i].sender
											._id, res.data[i].sender.username, res
											.data[i].sender.avatar, res.data[i]
											.sender.tag).outerHTML).outerHTML +
										Make.element('div', [{
											"key": "class",
											"value": "mdui-panel-item-summary"
										}], "发送时间：" + res.data[i].send_time).outerHTML +
										Make.element('i', [{
											"key": "class",
											"value": "mdui-panel-item-arrow mdui-icon material-icons"
										}], "keyboard_arrow_down").outerHTML
									).outerHTML +
									Make.element('div', [{
											"key": "class",
											"value": "mdui-panel-item-body"
										},
										{
											"key": "id",
											"value": "content-" + res.data[i]._id
										}
									]).outerHTML
								);
								$('#discuss_body')[0].appendChild(panel);
								this.showPost(res.data[i]._id, 1);
							}
							$('#discuss-page').jqPaginator('option', {
								totalCounts: res.data.count,
								currentPage: page
							});
						});
					};
				}(this.#element);
			}
			initLog() {
				this.log = new class {
					#father;
					#element;
					note;
					setUser;
					constructor(fa) {
						this.#father = fa;
						this.build();
					}
					build() {
						this.#element = Make.element('div', [{
								"key": "id",
								"value": "log"
							},
							{
								"key": "class",
								"value": "mdui-p-a-5"
							}
						]);
						this.#father.appendChild(this.#element);
					}
					bind() {
						this.#element.appendChild(Make.element('div', [{
							"key": "class",
							"value": "mdui-table-fluid"
						}], Make.element('table', [{
								"key": "class",
								"value": "mdui-table"
							}], Make.element('thead', [],
								Make.element('tr', [],
									Make.element('th', [], "操作者").outerHTML +
									Make.element('th', [], "操作类型").outerHTML +
									Make.element('th', [], "操作详情").outerHTML +
									Make.element('th', [], "备注").outerHTML
								).outerHTML
							).outerHTML +
							Make.element('tbody', [{
								"key": "id",
								"value": "log_body"
							}]).outerHTML
						).outerHTML));
						this.#element.appendChild(Make.element('br'));
						this.#element.appendChild(Make.element('div', [{
							"key": "id",
							"value": "log-page"
						}]));
						$('#log-page').jqPaginator(Make.pageConfig(20, this.updateLog));
					}
					updateLog(page = 1) {
						backend.call("/get_loglist", {
							page: page
						}, (res) => {
							for (var i = 0; i < res.data.length; i++) {
								var line = Make.element('tr', [],
									Make.element('td', [], res.data[i].operator)
									.outerHTML +
									Make.element('td', [], res.data[i].type).outerHTML +
									Make.element('td', [], res.data[i].content)
									.outerHTML +
									Make.element('td', [], res.data[i].note).outerHTML
								);
								$('#log_body')[0].appendChild(line);
							}
							$('#log-page').jqPaginator('option', {
								totalCounts: res.data.count,
								currentPage: page
							});
						});
					}
				}(this.#element);
			}
			initManagement() {
				this.management = new class {
					#father;
					#element;
					note;
					setUser;
					constructor(fa) {
						this.#father = fa;
						this.build();
						this.bind();
					}
					build() {
						this.#element = Make.element('div', [{
								"key": "id",
								"value": "management"
							},
							{
								"key": "class",
								"value": "mdui-p-a-5"
							}, {
								"key": "style",
								"val": "display:none;"
							}
						]);
						this.#father.appendChild(this.#element);
					}
					bind() {
						this.#element.appendChild(Make.element('button', [{
								"key": "class",
								"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
							},
							{
								"key": "onclick",
								"value": "body.management.setUser.object.open();"
							}
						], "设置用户权限"));
						this.#element.appendChild(Make.element('div', [{
							"key": "class",
							"value": "mdui-table-fluid"
						}], Make.element('table', [{
								"key": "class",
								"value": "mdui-table"
							}], Make.element('thead', [],
								Make.element('tr', [],
									Make.element('th', [], "举报类型").outerHTML +
									Make.element('th', [], "举报详情").outerHTML +
									Make.element('th', [], "备注").outerHTML +
									Make.element('th', [], "被举报次数").outerHTML +
									Make.element('th', [], '操作').outerHTML
								).outerHTML
							).outerHTML +
							Make.element('tbody', [{
								"key": "id",
								"value": "judge_body"
							}]).outerHTML
						).outerHTML));
						this.#element.appendChild(Make.element('div', [{
							"key": "id",
							"value": "judge-page"
						}]));
						$('#log-page').jqPaginator(Make.pageConfig(20, this.updateJudge));
					}
					updateJudge(page) {
						backend.call("/get_judgelist", {
							page: page
						}, (res) => {
							for (var i = 0; i < res.data.length; i++) {
								var line = Make.element('tr', [],
									Make.element('td', [], res.data[i].type).outerHTML +
									Make.element('td', [], res.data[i].content)
									.outerHTML +
									Make.element('td', [], res.data[i].note).outerHTML +
									Make.element('td', [], res.data[i].times)
									.outerHTML +
									Make.element('td', [],
										Make.element('button', [{
												"key": "class",
												"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
											},
											{
												"key": "onclick",
												"value": "body.management.judge(" +
													res.data[i].type + ", " + res
													.data[i].bid + ");"
											}
										], "同意").outerHTML +
										Make.element('button', [{
												"key": "class",
												"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
											},
											{
												"key": "onclick",
												"value": "body.management.reject(" +
													res.data[i]._id + ");"
											}
										], "拒绝").outerHTML +
										Make.element('button', [{
												"key": "class",
												"value": "mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
											},
											{
												"key": "onclick",
												"value": "body.management.note.object.open();"
											}
										], "备注").outerHTML
									).outerHTML
								);
								$('#log_body')[0].appendChild(line);
							}
							$('#judge-page').jqPaginator('option', {
								totalCounts: res.data.count,
								currentPage: page
							});
						});
					}
					judge(type, bid) {
						var note = $('#note')[0].value;
						$('#note')[0].value = "";
						if (type == "用户举报") {
							backend.call('/ban_user', {
								"uid": bid
							}, (res) => {
								Backend.tips(res);
								if (res.status == 200) {
									backend.call('/log', {
										"type": "用户权限调整",
										"content": "将用户 " + bid + "  设置为封禁用户",
										"note": (!note ? "管理员应用户举报而调整权限" : note)
									});
								}
							});
						} else if (type == "帖子举报") {
							backend.call('/delete_contents', {
								"id": bid
							}, (res) => {
								Backend.tips(res);
								if (res.status == 200) {
									backend.call('/log', {
										"type": "删除帖子",
										"content": "将帖子 " + bid + " 删除",
										"note": (!note ? "管理员应用户举报而删除帖子" : note)
									});
								}
							});
						}
					}
					reject(id) {
						backend.call('/delete_judge', {
							"id": id
						}, Backend.tips);
					}
					initNote() {
						this.note = new class {
							#element;
							#father;
							object;
							constructor(fa) {
								this.#father = fa;
								build();
							}
							build() {
								this.#element = Make.dialog(
									"note-dialog",
									"添加备注",
									Make.element('div', [{
											"key": "class",
											"value": "mdui-textfield mdui-textfield-floating-label"
										}], Make.element('label', [{
											"key": "class",
											"value": "mdui-textfield-label"
										}, ], "备注").outerHTML +
										Make.element('input', [{
												"key": "class",
												"value": "mdui-textfield-input"
											},
											{
												"key": "id",
												"value": "note"
											}
										]).outerHTML
									).outerHTML
								);
								this.#father.appendChild(this.#element);
								this.object = new mdui.Dialog(this.#element);
							}
						}(this.#element);
					}
					initSetUser() {
						this.setUser = new class {
							#element;
							#father;
							object;
							constructor(fa) {
								this.#father = fa;
								build();
								bind();
							}
							build() {
								this.#element = Make.dialog(
									"SetUser-dialog",
									"设置用户权限",
									Make.element('div', [{
											"key": "class",
											"value": "mdui-textfield mdui-textfield-floating-label"
										}], Make.element('label', [{
											"key": "class",
											"value": "mdui-textfield-label"
										}, ], "请指定用户名").outerHTML +
										Make.element('input', [{
												"key": "class",
												"value": "mdui-textfield-input"
											},
											{
												"key": "id",
												"value": "SetUser-username"
											}
										]).outerHTML
									).outerHTML +
									Make.element('label', [{
											"key": "class",
											"value": "mdui-checkbox"
										}], Make.element('input', [{
												"key": "type",
												"value": "checkbox"
											},
											{
												"key": "id",
												"value": "ban-check"
											}
										]).outerHTML +
										Make.element('i', [{
											"key": "class",
											"value": "mdui-checkbox-icon"
										}]).outerHTML +
										"封禁用户"
									).outerHTML +
									Make.element('label', [{
											"key": "class",
											"value": "mdui-checkbox"
										}], Make.element('input', [{
												"key": "type",
												"value": "checkbox"
											},
											{
												"key": "id",
												"value": "operator-check"
											}
										]).outerHTML +
										Make.element('i', [{
											"key": "class",
											"value": "mdui-checkbox-icon"
										}]).outerHTML +
										"管理员"
									).outerHTML +
									Make.element('label', [{
											"key": "class",
											"value": "mdui-checkbox"
										}], Make.element('input', [{
												"key": "type",
												"value": "checkbox"
											},
											{
												"key": "id",
												"value": "tag-check"
											}
										]).outerHTML +
										Make.element('i', [{
											"key": "class",
											"value": "mdui-checkbox-icon"
										}]).outerHTML +
										"设置 Tag"
									).outerHTML +
									Make.element('div', [{
											"key": "class",
											"value": "mdui-textfield mdui-textfield-floating-label"
										}], Make.element('label', [{
											"key": "class",
											"value": "mdui-textfield-label"
										}, ], "Tag").outerHTML +
										Make.element('input', [{
												"key": "class",
												"value": "mdui-textfield-input"
											},
											{
												"key": "disabled",
												"value": ""
											},
											{
												"key": "id",
												"value": "SetUser-tag"
											}
										]).outerHTML
									).outerHTML,
									Make.element('button', [{
											"key": "class",
											"value": "mdui-btn mdui-ripple"
										},
										{
											"key": "mdui-dialog-cancel",
											"value": ""
										}
									], '取消').outerHTML +
									Make.element('button', [{
											"key": "class",
											"value": "mdui-btn mdui-ripple"
										},
										{
											"key": "mdui-dialog-confirm",
											"value": ""
										},
										{
											"key": "id",
											"value": "SetUser-submit"
										}
									], '提交').outerHTML +
									Make.element('button', [{
											"key": "class",
											"value": "mdui-btn mdui-ripple"
										},
										{
											"key": "onclick",
											"value": "body.management.note.object.open();"
										}
									], '添加备注').outerHTML
								);
							}
							bind() {
								$('#ban-check')[0].indeterminate = true;
								$('#operator-check')[0].indeterminate = true;
								$('#tag-check')[0].onchange = () => {
									if ($('#tag-check')[0].checked) {
										$('#SetUser-tag')[0].removeAttr("disabled");
									} else {
										$('#SetUser-tag')[0].setAttribute("disabled",
											"");
										$('#SetUser-tag')[0].value = "";
									}
								};
								$('#SetUser-submit')[0].onclick = () => {
									var args = new Object();
									args.username = $('#SetUser-username')[0].value;
									if (!$('#ban-check')[0].indeterminate) args.ban = $(
										'#ban-check')[0].checked;
									if (!$('#operator-check')[0].indeterminate) args
										.operator = $('#operator-check')[0].checked;
									if ($('#tag-check').checked) args.tag = $(
										'#SetUser-tag')[0].value;
									backend.call('/set_user', args, (res) => {
										var note = $('#note')[0].value;
										$('#note')[0].value = "";
										Backend.tips(res);
										if (res.status == 200) {
											if (!$('#ban-check')[0]
												.indeterminate) {
												if ($('#ban-check')[0]
													.checked) {
													backend.call('/log', {
														"type": "用户权限调整",
														"content": "将用户 " +
															args
															.username +
															" 设为封禁用户",
														"note": (!note ?
															"管理员手动封禁" :
															note)
													});
												} else {
													backend.call('/log', {
														"type": "用户权限调整",
														"content": "将用户 " +
															args
															.username +
															" 解封",
														"note": (!note ?
															"管理员手动解封" :
															note)
													});
												}
											}
											if (!$('#operator-check')[0]
												.indeterminate) {
												if ($('#operator-check')[0]
													.checked) {
													backend.call('/log', {
														"type": "用户权限调整",
														"content": "将用户 " +
															args
															.username +
															" 设为管理员",
														"note": (!note ?
															"服主手动设置" :
															note)
													});
												} else {
													backend.call('/log', {
														"type": "用户权限调整",
														"content": "将用户 " +
															args
															.username +
															" 取消管理员",
														"note": (!note ?
															"服主手动设置" :
															note)
													});
												}
											}
											if ($('#tag-check')[0].checked) {
												backend.call('/log', {
													"type": "用户权限调整",
													"content": "将用户 " +
														args.username +
														" 的 Tag 设为 " +
														args.tag,
													"note": (!note ?
														"管理员手动设置" :
														note)
												});
											}
										}
									});
								};
							}
						}(this.#element);
					}
				}(this.#element);
			}
			build() {
				this.#element = Make.element('div', [{
						"key": "id",
						"value": "container"
					},
					{
						"key": "class",
						"value": "mdui-container mdui-shadow-3"
					},
					{
						"key": "style",
						"value": "font-size: 18px; background-color: white; opacity: 0.9;"
					}
				]);
				this.#father.appendChild(this.#element);
			}
			loadBackend() { //需要单独加载
				this.homepage.bind();
				this.userlist.bind();
				this.discuss.bind();
				//this.practice.bind();
				this.log.bind();
				this.management.bind();
			}
		}(this.#element);
	}
};