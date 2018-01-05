document.addEventListener('DOMContentLoaded',function(){
    var username_L = document.querySelector("#username_L");
    var password_L = document.querySelector("#password_L");
    var loginBtn = document.querySelector(".loginBtn");
    var username_Lshow = document.querySelector('.username_Lshow');
    var password_Lshow = document.querySelector('.password_Lshow');

    var status = [200,304];
    username_L.onblur = function(){
        var _username_L = username_L.value;
        var username_xhr = new XMLHttpRequest();
        username_xhr.onreadystatechange = function(){
            if(status.includes(username_xhr.status) && username_xhr.readyState === 4){
                // console.log(username_xhr.responseText);
                var data = JSON.parse(username_xhr.responseText);
                // console.log(data);
                
                var res = [];
                for(var j=0;j<data.length;j++){
                    res.push(data[j].username);
                }
                // console.log(res);
                if(res.includes(_username_L)){
                    username_Lshow.className = 'success';
                    username_Lshow.innerHTML = "用户名可用";
                }else{
                    username_Lshow.className = 'wrong';
                    username_Lshow.innerHTML = "用户名不可用";
                }
            }
        }
        username_xhr.open('get','../api/data/register.json',true);
        username_xhr.send();
    }
    // 点击登录验证密码是否匹配
    loginBtn.onclick = function(){
        var _username_L = username_L.value;
        var _password_L = password_L.value;
        var password_xhr = new XMLHttpRequest();
        password_xhr.onreadystatechange = function(){
            if(status.includes(password_xhr.status) && password_xhr.readyState === 4){
                var res = JSON.parse(password_xhr.responseText);
                // console.log(res);
                
                if(username_Lshow.className == 'success'){
                    for(var i=0;i<res.length;i++){
                        if(res[i].username == _username_L){
                            (function(i){
                                if(res[i].password == _password_L){
                                    window.location.href="../index.html";
                                }else{
                                    password_Lshow.innerText = "* 密码不正确";
                                }
                            })(i)
                        }
                    }
                }
            }
        }
        password_xhr.open('get','../api/data/register.json',true);
        password_xhr.send();
    }

})