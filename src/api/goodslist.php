<?php

    $page_no = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : 28;
    // echo($page_no);
    // 读取json内容
    $path = './data/goodslist.json';
    $file = fopen($path,'r');
    $content = fread($file,filesize($path));
    // 转成数组
    $arr_data = json_decode($content);

    $res = array(
        'data' =>array_slice($arr_data,($page_no -1)*$qty,$qty),
        'total'=>count($arr_data),
        'qty'=>$qty
    );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    fclose($file);
?>