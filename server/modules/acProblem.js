const { show, sessionWrite } = require("../functions");

exports.setAcProblem = (database, token, post) => {
    return database.collection("acProblem").deleteOne({}).then(() => {
        var obj = JSON.parse(post.data);
        for(var i = 0; i < obj.problems.length; i++){
            obj.problems[i].id = i;
        }
        return database.collection("acProblem").insertOne({"data": obj}).then(() => {
            return show(200, {msg: "操作成功"});
        });
    });
};

exports.getAcProblem = (database, token, post) => {
    return database.collection("acProblem").find({}).toArray().then((res) => {
        if(res.length == 0) return show(200, []);
        var ret = randomSample(res[0].data.problems, res[0].data.totalProblems);
        for(var i = 0; i < ret.length; i++){
            ret[0].answer = "";
        }
        return show(200, ret);
    });
};

exports.calcPoints = (database, token, post) => {
    return database.collection("acProblem").find({}).toArray().then((res) => {
        if(res.length == 0){
            return sessionWrite(database, token, "speak", true).then(() => {
                return show(200, {"points": points, msg: "恭喜，您已通过入站测试！", accept: true});
            });
        }
        var points = 0;
        post.data = JSON.parse(post.data);
        for(var i = 0; i < post.data.length; i++){
            var currentProblem = res[0].data.problems[post.data[i].id];
            switch(currentProblem.type){
                case "radio":
                case "text":
                    if(currentProblem.answer == post.data[i].answer){
                        points += currentProblem.points;
                    }
                break;
                case "radios":
                    var flag = false;
                    var cnt = 0;
                    for(var j = 0; j < post.data[i].answer; j++){
                        if(!currentProblem.answer.includes(post.data[i].answer[j])){
                            flag = true;
                            break;
                        }
                        cnt++;
                    }
                    if(flag) break;
                    if(cnt != currentProblem.answer.length) points += currentProblem["imp-points"];
                    else points += currentProblem.points;
                break;
                case "texts":
                    if(currentProblem.answer.includes(post.data[i].answer)){
                        points += currentProblem.points;
                    }
                break;
            }
        }
        if(points >= res[0].data.acceptPoints){
            return sessionWrite(database, token, "speak", true).then(() => {
                return show(200, {"points": points, msg: "恭喜，您已通过入站测试！", accept: true});
            });
        }else{
            return show(200, {"points": points, msg: "抱歉，未通过入站测试！", accept: false});
        }
    });
};

function randomSample(arr, length){
    var newArr = [];
    for(var i = 0; i < length; i++){
      var index = ~~(Math.random()*arr.length);
      var item = arr[index];
      newArr.push(item);
      arr.splice(index, 1);
    }
    return newArr.reverse();
}