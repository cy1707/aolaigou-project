document.addEventListener('DOMContentLoaded',function(){
    $('.right_guid').on('mouseenter','li',function(){
        $(this).find('.wenzi').animate({right:48});
       
    }).on('mouseleave','li',function(){
        $(this).find('.wenzi').stop(true).animate({right:0});
    }).on('click','li',function(){
        if($(this).find('.wenzi').text() === '购物车'){
            
        }
        // console.log($(this).find('.wenzi').text())
    })
    var totop = document.querySelector('.totop');
    // 返回顶部
    totop.onclick = ()=>{

        let timer = setInterval(()=>{
            // 获取当前滚动果的距离：5000,100
            let scrollY = window.scrollY;
            console.log(scrollY);
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
    }
    // 点击跳转到购物车页面
    
    
})