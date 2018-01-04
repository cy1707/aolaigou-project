document.addEventListener('DOMContentLoaded',function(){
        var username = document.querySelector('#userName');
        var userName_club = document.querySelector('.userName_club');
        var password =document.querySelector('#password');
        var repassword = document.querySelector('#repassword');
        var repassword_club = document.querySelector('.repassword_club');
        var password_club = document.querySelector('.password_club');
        var showcode = document.querySelector('.showcode');
        var registerBtn = document.querySelector('.registerBtn');
        var yzcode = document.querySelector('#yzcode');
        var yzcode_club = document.querySelector('.yzcode_club')
        // 生成验证码
        show();
        function show(){
            var res = [];
            // randomNumber(0,9)
            for(var i=0;i<4;i++){
                res.push(randomNumber(0,9))
            }
            res = res.join('');
            showcode.innerHTML = res;
        }
        showcode.onclick = function(){
            show();
        }
        var status = [200,304];
        // 用户名是否存在
        username.onblur = function(){
            var _username = username.value;
            var uname_xhr = new XMLHttpRequest();
            uname_xhr.onreadystatechange = function(){
                if(status.includes(uname_xhr.status) && uname_xhr.readyState === 4){
                    console.log(uname_xhr.responseText);
                    var data = uname_xhr.responseText;
                    // console.log(data);
                    if(data === 'yes'){
                        console.log(666);
                        userName_club.className = 'success';
                        // userName_club.style.color = "grren";
                        userName_club.innerHTML = '用户名可用'
                    }else if(data === 'null'){
                        userName_club.className = 'error';
                        // userName_club.style.color = "red";

                        userName_club.innerText = "* 用户名不能为空"
                    }else if(data === 'no'){
                        userName_club.className = 'error';
                        // userName_club.style.color = "red";

                        userName_club.innerText = "* 该用户名已被注册"
                    }

                }
            }
            uname_xhr.open('get','../api/register.php?username='+_username,true);
            uname_xhr.send();
        }
        // 密码一致验证
        repassword.onblur = function(){
            var _password = password.value;
            var _repassword = repassword.value;
            console.log(_password,_repassword)
            if(_password == _repassword && _password != ''){
                repassword_club.className = 'success';
                repassword_club.innerText = "密码一致";
            }else if(_repassword == ''){
                repassword_club.className = 'error';
                repassword_club.innerText = '*密码不能为空';
            }else if(_repassword != _password){
                repassword_club.className = 'error';
                repassword_club.innerText = '*两次输入密码不一致，请重新输入';
            }else if(_password == ''){
                password_club.className = 'error';
                password_club.innerText = '密码不能为空';
            }
        }
        // 验证码验证
        yzcode.onblur = function(){
            var _yzcode = yzcode.value;
            if(_yzcode != showcode.innerHTML){
                show();
                yzcode_club.className = 'error';
                yzcode_club.innerText = "验证码错误";
            }else{
                yzcode_club.className = 'success';
                yzcode_club.innerText = "验证码一致";
            }
        }
        // 点击注册
        registerBtn.onclick = function(){
            var _username = username.value;
            var _password = password.value;
            var _repassword = repassword.value;
            var _yzcode = yzcode.value;
            if(userName_club.className == 'success' && _password == _repassword && _yzcode == showcode.innerHTML){
                // console.log("通过");
                window.location.href="../html/login.html";
                // 注册成功把用户信息写入register.json中
                var register_xhr = new XMLHttpRequest();
                register_xhr.onreadystatechange = function(){
                    if(status.includes(register_xhr.status) && register_xhr.readyState === 4){
                        console.log(register_xhr.responseText);
                    }
                }
                register_xhr.open('get','../api/login.php?username='+_username+'&password='+_password,true);
                register_xhr.send();

            }else{
                // console.log("不通过",_yzcode,showcode.innerHTML);
                alert('注册失败');
            }
        }

})
       
        
