<?php
    $username = isset($_GET['username']) ? $_GET['username'] : Null;
    $path = './data/register.json';

    $file = fopen($path,'r');

    $content = fread($file,filesize($path));

    $arr_data = json_decode($content,true);

    $sum = count($arr_data);
    // echo $sum;
    $arr = array();
    
    for($i=0;$i<$sum;$i++){
        foreach($arr_data[$i] as $key=>$val){
            if($key == 'username'){
                $arr[]=$val;
            }  
        }
    }    
    // var_dump($arr);
    if(in_array($username,$arr) && $username != ''){
        echo "no";
    }else if($username == ""){
        echo "null";
    }else{
        echo "yes";
    }

    fclose($file);
    
?>