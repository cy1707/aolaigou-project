<?php
    $username = isset($_GET['username']) ? $_GET['username'] : Null;
    $password = isset($_GET['password']) ? $_GET['password'] : Null;
    $path = 'data/register.json';

    $file = fopen($path,'r');

    $content = fread($file,filesize($path));

    $data = json_decode($content);
    // 把新注册的用户名和密码写入json里面
    array_push($data,"'username':$username,'password':$password");
    var_dump($data);

?>