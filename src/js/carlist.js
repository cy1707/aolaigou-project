document.addEventListener("DOMContentLoaded", function(){
    var emTol = document.querySelector('.carwindc-1 em');

    var status = [200,304];
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(status.includes(xhr.status) && xhr.readyState === 4){
            var data = JSON.parse(xhr.responseText);
            // console.log(data);
            document.querySelector('.car_hot_list').innerHTML = data.map(function(item){
                return `<li>
                            <img src="${item.imgurl}">
                            <div class="liti"><a>${item.describe}</a></div>
                            <div class="jiage"><span>${item.price}</span></div>
                        </li>`
            }).join('');
        }
    
    }
    xhr.open('get','../api/data/carhot.json',true);
    xhr.send();
    var carlist_addlist = document.querySelector('.carlist_addlist');
    // 购物车商品
    // 读取cookie
    var carlist;
    var cookies = document.cookie;
    if(cookies.length){
        cookies = cookies.split('; ');
        cookies.forEach(function(item){
            var arr = item.split('=');
            if(arr[0] === 'carlist'){
                carlist = arr[1];
            }
        })
    }
    var data = JSON.parse(carlist);
    // console.log(data);
    carlist_addlist.innerHTML = data.map(function(item){
        
        // console.log(item);
        return `<tr class="addline" guid="${item.guid}">
            <td class="tab-zdcon-line"><input type="checkbox" id="add_value"></td>
                <td class="tab-zdcon-add  tab-zdcon-line">
                    <div class="tb3-con">
                        <div class="tb3-divtu"><img src="${item.imgurl}"></div>
                        <div class="tb3-divti">
                            <a href="#">${item.describe}</a>
                            <p>
                                <span style="color:#999;">${item.color}</span>
                                <span style="color:#999;">${item.size}</span>
                            </p>
                        </div>
                    </div>
                </td>
                <td class="tab-zdcon-line goodsjg">${item.price}</td>
                <td class="tab-zdcon-line">
                    <div class="cart-num" type="qtyColumn">
                        <ul class="clearfix">
                            <li>
                                <a href="javascript:void(0);" class="cart-numa cart_jian">-</a>
                            </li>
                            <li>
                                <input type="text" class="cartnum-value" value="${item.qty}">
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="cart-numa cart_jia">+</a>
                            </li>
                        </ul>
                    </div>
                </td>
                <td class="tab-zdcon-line"><span><p>￥0.00</p><p style="cursor:pointer"></p></span></td>
                <td class="tab-zdcon-line"><em class="shangpinjg"></em></td>
                <td><button>删除</button></td>
            </tr>`
        
    }).join('');
    var pricearr = [];
    var qtynum = [];
    data.forEach(function(item){
        var pricenum = item.price.slice(1)
        pricearr.push(pricenum);
        qtynum.push(item.qty);
    })
    var emm = document.querySelectorAll('.shangpinjg');
    for(var i=0;i<emm.length;i++){
        emm[i].innerHTML = '￥'+pricearr[i]*qtynum[i];
    }
    // console.log(pricearr,qtynum);
    // 小计的计算
    $('.cart-num').on('click','.cart_jian',function(){
        var guid = this.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('guid');
        var cartnum_value = this.parentElement.parentElement.querySelector('.cartnum-value');
        var buynum = cartnum_value.value;
        buynum --;
        cartnum_value.value = buynum;
        if(cartnum_value.value <=1){
            cartnum_value.value = 1;
        }
        var currentprice = this.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.goodsjg').innerText.slice(1)*1;
        var em = this.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.shangpinjg');
        em.innerHTML = '￥'+currentprice*(cartnum_value.value);
        for(var i=0;i<data.length;i++){
            if(data[i].guid === guid){
                console.log(data[i].qty)
                data[i].qty = buynum;
            }
        }
        document.cookie = 'carlist=' + JSON.stringify(data);
        // console.log(currentprice);
        // $('.shangpinjg').html = buynum*
        // console.log(buynum);
    }).on('click','.cart_jia',function(){
        var cartnum_value = this.parentElement.parentElement.querySelector('.cartnum-value');
        var guid = this.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('guid');
        // console.log(guid);
        var buynum = cartnum_value.value;
        buynum ++;
        cartnum_value.value = buynum;
        if(cartnum_value.value >=99){
            cartnum_value.value = 99;
        }
        var currentprice = this.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.goodsjg').innerText.slice(1)*1;
        var em = this.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.shangpinjg');
        em.innerHTML = '￥'+currentprice*(cartnum_value.value);
        for(var i=0;i<data.length;i++){
            if(data[i].guid === guid){
                console.log(data[i].qty)
                data[i].qty = buynum;
            }
        }
        document.cookie = 'carlist=' + JSON.stringify(data);
        // console.log(currentprice);
        // console.log(buynum);
    })
    // 删除商品
    $('.carlist_addlist').on('click','button',function(){
        // console.log(this.parentElement.parentElement.getAttribute('guid'));
        var guid = this.parentElement.parentElement.getAttribute('guid');
        for(var i=0;i<data.length;i++){
            if(data[i].guid === guid){
                data.splice(i,1);
                break;
            }
        }
        document.cookie = 'carlist='+ JSON.stringify(data);
        
        this.parentElement.parentElement.remove();
        
        // console.log(this.parentElement.parentElement);

    })
    // 清空购物车
    $('.removeBtn').on('click',function(){
        // 在cookit中删除
        emTol.innerHTML = '￥0.00';
        var now = new Date();
        now.setDate(now.getDate()-1000);
        document.cookie = 'carlist=x;expires='+now.toUTCString();
        // 删除DOM节点
        var trs = document.querySelectorAll('.carlist_addlist tr');
        for(var i=0;i<trs.length;i++){
            trs[i].remove();
        }

        // 总价设为0
        
        
    })
    var $carlist_addlist = $('.carlist_addlist');
    var $trs = $carlist_addlist.find('tr');  
    var $checkboxs = $trs.find(':checkbox');
    var $checked = $checkboxs.filter(':checked');
    
    // 选择+全选
    
    // 全选
    $('#footerCheckAll').click(function(){
        $trs.toggleClass('selected');
        $checkboxs.prop('checked',this.checked);
        // 计算商品价格
        var tol = 0;

        // console.log($("#add_value").is(':checked'));
        for(var i=0;i<add_value.length;i++){
            if(add_value[i].checked == true){
                var currentshangpinjg = add_value[i].parentElement.parentElement.querySelector('.shangpinjg').innerText;
                currentshangpinjg=currentshangpinjg.slice(1)*1;
                tol += currentshangpinjg;

                console.log(tol);
                emTol.innerHTML = '￥'+tol;
            }
        }

        if(document.querySelector('#footerCheckAll').checked == false){
                emTol.innerHTML = '￥0.00';

        }
    });
    $checkboxs.on('click',function(){
        if($checked.length != $checkboxs.length){
            // console.log(666);
            document.querySelector('#footerCheckAll').checked = false;
        }
    })
    // 根据选择的商品计算总价,点击这个表就计算商品价格
    // 根据被选中的框对应的小计计算总价
    
    var add_value = document.querySelectorAll('#add_value');
    $('.carlist_table').on('click',function(){
        var tol = 0;

        // console.log($("#add_value").is(':checked'));
        for(var i=0;i<add_value.length;i++){
            if(add_value[i].checked == true){
                var currentshangpinjg = add_value[i].parentElement.parentElement.querySelector('.shangpinjg').innerText;
                currentshangpinjg=currentshangpinjg.slice(1)*1;
                tol += currentshangpinjg;

                console.log(tol);
                emTol.innerHTML = '￥'+tol;
            }else if($("#add_value").is(':checked') == false){
                // emTol.innerHTML = '￥'+tol;
                emTol.innerHTML = '￥0.00';

            }
        }
        
    })

})