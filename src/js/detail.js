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
            // console.log(currentgoods);
            // 把对应商品信息写入页面
            currentImg.src = currentgoods.img[0];
            document.querySelector('.goods_small1').src = currentgoods.img[0];
            document.querySelector('.goods_small2').src = currentgoods.img[1];
            document.querySelector('.goods_small3').src = currentgoods.img[2];
            document.querySelector('.goods_small4').src = currentgoods.img[3];
            document.querySelector('.goods_small5').src = currentgoods.img[4];

            currentImg.setAttribute('data-big',currentgoods.img[0]);
            // console.log(currentgoods.img[0]);
            // console.log(currentImg.getAttribute('data-big'));
            goods_des_p.innerHTML = currentgoods.price;
            goods_des_til.innerHTML = currentgoods.describe;

            // 切换图片
            $('.goodsImg_more').on('click','li',function(){
                $('.goodsImg_more').find('li').css({border:'1px solid #ccc'})
                $(this).css({border:'1px solid red'});
                currentImg.src = $(this).find('img').attr('src');
                // console.log($(this).find('img').attr('src'));
            })
            // 放大镜效果
            // 给放大镜图片的路径
            $('.goodsImg_big').gdsZoom();
            $('.smallList img').click(function(){
                $('.goodsImg_big img').attr({
                    'src':this.src,
                    'data-big':$(this).attr('data-big') || this.src
                });
            })
        }
        

    }
    xhr.open('get','../api/data/goodslist.json',true);
    xhr.send();
    $('#right_fixed').on('mouseenter','li',function(){
        $(this).find('.wenzi').animate({right:48});
       
    }).on('mouseleave','li',function(){
        $(this).find('.wenzi').stop(true).animate({right:0});
    }).on('click','.totop',function(){
            let timer = setInterval(()=>{
                // 获取当前滚动果的距离：5000,100
                let scrollY = window.scrollY;
                // console.log(scrollY);
                // 计算速度
                let speed = scrollY/10;//500,10

                scrollY -= speed;
                // 清除定时器
                // 当速度为0
                // 当scrollY等于0
                if(speed <= 0 || scrollY === 0){
                    clearInterval(timer);
                }

                scrollTo(0,scrollY);

            },30);
        })
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
    // 用于保存购物车的商品
    
    var carlist = [];
    // 点击加到购物车
    $('.tocarBtn').on('click',function(){
        var buynum = $('#buyNum').val();
        // 获取当前选择的颜色，尺码大小，数量
        // console.log(currentColor,currentSize,$('#buyNum').val());
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
        // 点击加入购物车商品存入cookie
        // 点击添加购物车同时把商品数据存入数据库
        
        var status = [200,304];
        var goods_xhr = new XMLHttpRequest();
        goods_xhr.onreadystatechange = ()=>{
        if(status.includes(goods_xhr.status) && goods_xhr.readyState === 4){
            var data = JSON.parse(goods_xhr.responseText);
            // 拿到data对应的id的商品数据data[id];
            // console.log(carlist.length);
            // console.log(goods);
            // 判断是否存在相同商品
            var carlist= cookie.get("carlist");
            if(carlist){
                carlist=JSON.parse(carlist);
                // console.log(carlist);
            }else{
                carlist = [];
            }
            
            for(var i=0;i<carlist.length;i++){
                    // console.log(carlist[i].guid*1,id*1);
                    if(carlist[i].guid*1 == id*1){
                        break;
                    }
                }
                     // 不存在商品
                if(i=== carlist.length){
                    var goods = {
                        guid:data[id-1].id,
                        imgurl:data[id-1].img[0],
                        price:data[id-1].price,
                        describe:data[id-1].describe,
                        color:currentColor,
                        size:currentSize,
                        qty:buynum
                    };
                    carlist.push(goods);
                }else{
                    // console.log(buynum);
                    carlist[i].qty =  carlist[i].qty*1 + buynum*1;
                }
                
                document.cookie = 'carlist='+JSON.stringify(carlist);


            // $.ajax({
            //     url:'../api/carlist.php',
            //     data:{
            //         guid:data[id-1].id,
            //         imgurl:data[id-1].img[0],
            //         price:data[id-1].price,
            //         describe:data[id-1].describe,
            //         color:currentColor,
            //         size:currentSize,
            //         qty:buynum
            //     },
            //     success:function(){
            //         console.log(666);
            //     }
                

            // });

        }
        

    }
    goods_xhr.open('get','../api/data/goodslist.json',true);
    goods_xhr.send();



    });
    // 点击切换
    $('.goods_del_bt').on('click','span',function(){
        var span = document.querySelector('.goods_del_bt').querySelectorAll('span');
        for(var i=0;i<span.length;i++){
            span[i].className = '';
        }
        $(this).addClass('selected');
        
    })
    
})
