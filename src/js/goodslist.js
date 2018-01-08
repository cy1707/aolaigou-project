(function($){
    $(function(){
    // document.addEventListener("DOMContentLoaded",function(){
        // console.log(666);
        var goodslist_show = document.querySelector('.goodslist_show');
        // var goods_ul = document.querySelector('.goods_ul');
        var page = document.querySelector('.goodslist_all_crpage');
        // 每页30个
        var pageNo = 1;
        var qty = 28;
        // console.log(666);
        var status = [200,304];
        // 请求
        var goods_xhr = new XMLHttpRequest();
        goods_xhr.onreadystatechange = function(){
            if(status.includes(goods_xhr.status) && goods_xhr.readyState === 4){
                // console.log(goods_xhr.responseText);
                var res = JSON.parse(goods_xhr.responseText);
                // console.log(res);
                var ul = document.createElement('ul');
                ul.innerHTML = res.data.map(function(item){
                    // console.log(item.img[0]);

                    return `<li class="goodsli" data-id="${item.id}">
                                <div class="p1"><img src="${item.img[0]}"></div>
                                <div class="p2">${item.price}</div>
                                <div class="p3"><a href="#">${item.describe}</a></div>
                            </li>`
                }).join('');
                ul.className = 'goods_ul';
                goodslist_show.innerText='';
                goodslist_show.appendChild(ul);
                // 分页处理
                page.innerText = '' ;
                var pageQty = Math.ceil(res.total/res.qty);
                for(var i=1;i<=pageQty;i++){
                    var span = document.createElement('span');
                    span.innerHTML = i;
                    if(i === pageNo){
                        span.className = 'active';
                    }
                    page.appendChild(span);
                }
                // 点击商品跳转详情页
                $('.goodslist_show').on('click','.goodsli',function(){
                    var id = $(this).attr('data-id');
                    location.href = "../html/detail.html?id="+id;
                })

            }
        };
        goods_xhr.open('post','../api/goodslist.php',true);
        // 请求头
        goods_xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");

        goods_xhr.send(`pageNo=${pageNo}&qty=${qty}`);

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
        
        // 点击分页切换
        page.onclick = function(e){
            // console.log(e.target.tagName.toLowerCase());
            if(e.target.tagName.toLowerCase() === 'span'){
                pageNo = e.target.innerText*1;
                // console.log(pageNo);

                goods_xhr.open('post','../api/goodslist.php',true);
                goods_xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                goods_xhr.send(`pageNo=${pageNo}&qty=${qty}`);
            }

        }
        
    })
})(jQuery)