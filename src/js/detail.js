document.addEventListener("DOMContentLoaded",function(){
    // 获取当前url
    var parmse = location.search;//=>?id=09;

    parmse = parmse.slice(1);

    var arr = parmse.split('=');

    var id = arr[1]*1;//=>9
    // console.log(id);
    var currentImg = document.querySelector('.currentImg');
    var goods_des_p = document.querySelector('.goods_des_p');
    var goods_des_til = document.querySelector('.goods_des_til');
    // 请求商品id，生成列表
    var status = [200,304];
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(status.includes(xhr.status) && xhr.readyState === 4){
            var data = JSON.parse(xhr.responseText);
            // 拿到data对应的id的对象data[id];
            var currentgoods = data[id-1];
            console.log(currentgoods);
            // 把对应商品信息写入页面
            currentImg.src = currentgoods.img;
            currentImg.setAttribute('data-big',currentgoods.img);
            // console.log(currentImg.getAttribute('data-big'));
            goods_des_p.innerHTML = currentgoods.price;
            goods_des_til.innerHTML = currentgoods.describe;
            // 放大镜效果
            // 给放大镜图片的路径
            $('.goodsImg_big').gdsZoom();
        }
        

    }
    xhr.open('get','../api/data/goodslist.json',true);
    xhr.send();
    // 勾选颜色
    // 保存当前选中的颜色
    var currentColor;
    $('.sel_color').on('click','.sel_attr2',function(){
        $('.sel_color').children('.sel_attr2').css({
            border:'1px solid #ccc'
        })
        currentColor = $(this).text();
        // console.log(currentColor);

        $(this).css({
            border:'2px solid red'
        })
    });

    
    // 选择尺码
    var currentSize;
    $('.sel_number').on('click','.sel_attr2',function(){
        $('.sel_number').children('.sel_attr2').css({
            border:'1px solid #ccc'
        })
        currentSize = $(this).text();
        $(this).css({
            border:'2px solid red'
        })
    });
    // 选择数量
    // 加
    $('.addBtn').on('click',function(){
        $('.addBtn').on('mousedown',function(){
            $('.addBtn').css({
                background:'orange'
            })
        }).on('mouseup',function(){
            $('.addBtn').css({
                background:'#fff'
            })
        });
        $('#buyNum').get(0).value = $('#buyNum').get(0).value*1+1;
        if($('#buyNum').get(0).value>=99){
            $('#buyNum').get(0).value = 99;
        }
        // console.log($('#buyNum').get(0).value)
    });
    // 减
    $('.subBtn').on('click',function(){
        $('.subBtn').on('mousedown',function(){
            $('.subBtn').css({
                background:'orange'
            })
        }).on('mouseup',function(){
            $('.subBtn').css({
                background:'#fff'
            })
        });
        $('#buyNum').get(0).value = $('#buyNum').get(0).value*1-1;
        if($('#buyNum').get(0).value<=1){
            $('#buyNum').get(0).value = 1;
        }
        // console.log($('#buyNum').get(0).value)
    });
    // 点击加到购物车
    $('.tocarBtn').on('click',function(){
        // 获取当前选择的颜色，尺码大小，数量
        console.log(currentColor,currentSize,$('#buyNum').val());
        // 点击商品飞入购物车
        var $img = $('.currentImg');
        var $copyImg = $img.clone();
        $copyImg.css({
            position:'absolute',
            left:$img.offset().left,
            top:$img.offset().top,
            width:$img.width()
        });
        $copyImg.appendTo('body');
        $copyImg.animate({
            left:$('.icon-gouwuche1').offset().left,
            top:$('.icon-gouwuche1').offset().top + $('.icon-gouwuche1').height(),
            width:0,
            height:0
        },function(){
            
            $copyImg.remove();
        });
    });
    
})
