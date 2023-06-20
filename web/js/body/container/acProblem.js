Body.container.acProblem = new class{
    father;
    element;
    constructor(fa){
        this.father = fa;
    }
    build(){
        this.element = Make.element('div', [
            {"key": "id", "value": "accessProblem"},
            {"key": "class", "value": "mdui-p-a-5"}
        ]);
        this.father.appendChild(this.element);
    }
    bind(){
        this.element.innerHTML = "";
        backend.call("/get_acProblem", [], (res) => {
            res = res.data;
            for(var i = 0; i < res.length; i++){
                var currentProblem = Make.element('form', [
                    {"key": "id", "value": "acProblem-" + res[i].id},
                    {"key": "problem_id", "value": res[i].id},
                    {"key": "problem_type", "value": res[i].type}
                ], res[i].description);
                currentProblem.appendChild(Make.element('br'));
                switch(res[i].type){
                    case "radio":
                        for(var j = 0; j < res[i].choices.length; j++){
                            currentProblem.appendChild(Make.element('label', [
                                {"key": "class", "value": "mdui-radio"}
                            ],  Make.element('input', [
                                    {"key": "type", "value": "radio"},
                                    {"key": "name", "value": "problem-" + res[i].id},
                                    {"key": "value", "value": res[i].choices[j].id}
                                ]).outerHTML
                              + Make.element('i', [
                                    {"key": "class", "value": "mdui-radio-icon"}
                                ]).outerHTML
                              + res[i].choices[j].description
                            ));
                            currentProblem.appendChild(Make.element('br'));
                        }
                    break;
                    case "radios":
                        for(var j = 0; j < res[i].choices.length; j++){
                            currentProblem.appendChild(Make.element('label', [
                                {"key": "class", "value": "mdui-checkbox"}
                            ],  Make.element('input', [
                                    {"key": "type", "value": "checkbox"},
                                    {"key": "name", "value": "problem-" + res[i].id},
                                    {"key": "value", "value": res[i].choices[j].id}
                                ]).outerHTML
                              + Make.element('i', [
                                    {"key": "class", "value": "mdui-checkbox-icon"}
                                ]).outerHTML
                              + res[i].choices[j].description
                            ));
                            currentProblem.appendChild(Make.element('br'));
                        }
                    break;
                    case "text":
                    case "texts":
                        currentProblem.appendChild(Make.element('div', [
                            {"key": "class", "value": "mdui-textfield mdui-textfield-floating-label"}
                        ],  Make.element('input', [
                                {"key": "class", "value": "mdui-textfield-input"},
                                {"key": "id", "value": "problem-text-" + res[i].id},
                                {"key": "type", "value": "text"}
                            ]).outerHTML
                        ));
                        currentProblem.appendChild(Make.element('br'));
                    break;
                };
                this.element.appendChild(currentProblem);
            }
            this.element.appendChild(Make.element('button', [
                {"key": "class", "value": "mdui-btn mdui-ripple mdui-color-theme-accent"},
                {"key": "id", "value": "acProblem-form-submit"}
            ], '提交'));
            $('#acProblem-form-submit')[0].onclick = () => {
                var arr = $('#accessProblem form');
                var ret = new Array();
                for(var i = 0; i < arr.length; i++){
                    var ans;
                    switch(arr[i].getAttribute("problem_type")){
                        case "radio":
                            var radios = document.getElementsByName("problem-" + arr[i].getAttribute("problem_id"));
                            for(var j = 0; j < radios.length; j++){
                                if(radios[j].checked){
                                    ans = radios[j].value;
                                    break;
                                }
                            }
                            if(!ans){
                                mdui.snackbar({msg: "请填写所有问题！"});
                                return;
                            }
                        break;
                        case "radios":
                            var radios = document.getElementsByName("problem-" + arr[i].getAttribute("problem_id"));
                            ans = new Array();
                            for(var j = 0; j < radios.length; j++){
                                if(radios[j].checked){
                                    ans.push(radios[j].value);
                                    break;
                                }
                            }
                            if(!ans.length){
                                mdui.snackbar({msg: "请填写所有问题！"});
                                return;
                            }
                        break;
                        case "text":
                        case "texts":
                            ans = $('#problem-text-' + arr[i].getAttribute("problem_id"))[0].value;
                        break;
                    }
                    ret.push({"id": arr[i].getAttribute("problem_id"), "answer": ans});
                }
                backend.call("/calc_points", {"data": JSON.stringify(ret)}, (res) => {
                    if(res.data.accept){
                        window.localStorage.setItem('speak', true);
                    }
                    mdui.snackbar({
                        message: res.data.msg,
                        timeout: 500,
                        onClosed: () => {
                            setTimeout(() => {
                                location.reload();
                            }, 500);
                        }
                    });
                });
            };
        });
    }
}(Body.container.element);