document.addEventListener('DOMContentLoaded',function(){
    var banner = document.querySelector('.banner');
    var ul = banner.querySelector('ul');
    var imgs=banner.querySelectorAll('img');
    ul.appendChild(ul.children[0].cloneNode(true));
    var len = ul.children.length;
    var index = 0;
    var imgWidth = banner.clientWidth;
    ul.style.width = imgWidth*len + 'px';
    // 生成页码
    var page = document.createElement('div');
    page.classList.add('page');
    for(var i=1;i<len;i++){
        var span = document.createElement('span');
        span.innerText = i;
        if(i===1){
            span.classList.add('active');
    }
        page.appendChild(span);
    }
    banner.appendChild(page);
    var timer = setInterval(autoPlay,3000);
    // 鼠标移入移出
    banner.onmouseenter = ()=>{
        clearInterval(timer);
    }

    banner.onmouseleave = ()=>{
        timer = setInterval(autoPlay,3000);
    }

    banner.onclick = e=>{
        if(e.target.parentNode.className === 'page'){
            // 把index改成当前页码对应的索引值
            index = e.target.innerText-1;

            show();
        }
    }

    function autoPlay(){
        index++;

        show();
    }

    function show(){
        if(index>=len){
            ul.style.left = 0;
            index = 1;
        }
        animate(ul,{left:-index*imgWidth});

        // 页码高亮
        // 先清除所有高亮
        for(var i=0;i<len-1;i++){
            page.children[i].className = '';
        }

        if(index==len-1){
            page.children[0].classList.add('active')
        }else{
            page.children[index].classList.add('active');
        }
    }


});