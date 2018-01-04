(function($){
    $(function(){
        var goodslist_show = document.querySelector('.goodslist_show');
        // var goods_ul = document.querySelector('.goods_ul');
        var page = document.querySelector('.goodslist_all_crpage');
        // 每页30个
        var pageNo = 1;
        var qty = 28;

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
                    return `<li data-id="${item.id}">
                                <div class="p1"><img src="${item.img}"></div>
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

            }
        };
        goods_xhr.open('post','../api/goodslist.php',true);
        // 请求头
        goods_xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");

        goods_xhr.send(`pageNo=${pageNo}&qty=${qty}`);

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