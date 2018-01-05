<?php
    $username = isset($_GET['username']) ? $_GET['username'] : Null;
    $password = isset($_GET['password']) ? $_GET['password'] : Null;
    $path = 'data/register.json';

    $file = fopen($path,'r');

    $content = fread($file,filesize($path));

    $data = json_decode($content,true);
    // 把新注册的用户名和密码写入json里面
    $data[] = array("username"=>$username,"password"=>$password);
    // var_dump($data);
    fclose($file);
    // var_dump($data);

    $file = fopen($path,'w');
    fwrite($file,json_encode($data,JSON_UNESCAPED_UNICODE));
    fclose($file);

    echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>