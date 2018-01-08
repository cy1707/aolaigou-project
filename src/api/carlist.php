<?php
    include 'connect.php';
    
    $guid = isset($_GET['guid']) ? $_GET['guid'] : '';
    $imgurl = isset($_GET['imgurl']) ? $_GET['imgurl'] : '123456';
    $price = isset($_GET['price']) ? $_GET['price'] : '';
    $describe = isset($_GET['describe']) ? $_GET['describe'] : '';
    $color = isset($_GET['color']) ? $_GET['color'] : '';
    $size = isset($_GET['size']) ? $_GET['size'] : '';
    $qty = isset($_GET['qty']) ? $_GET['qty'] : '';

    //查看用户名是否已经存在
    $sql = "select guid from carlist where guid='$guid'";
    $result = $conn->query($sql);
    if($result->num_rows>0){

        $sql = "insert into carlist (qty) values('$qty')";
        
    }else{
        // 密码md5加密
        // $password = md5($password);

        /*
            password_hash()     //对密码加密.
                * PASSWORD_DEFAULT：Bcrypt加密算法，字段超过60个字符长度，
                * PASSWORD_BCRYPT：字符串长度总为60。
            password_verify()    //验证已经加密的密码，检验其hash字串是否一致.
         */
        // $password = password_hash($password,PASSWORD_DEFAULT);

        // $sql = "insert into carlist (guid,imgurl,price,describe,color,size,qty) values('$guid','$imgurl','$price','$describe','$color','$size','$qty')";

        $sql = "insert into user (guid,qty) values('$guid','$qty')";

        // 获取查询结果
        $result = $conn->query($sql);

        if ($result) {
            echo "ok";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    
    

    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
?>