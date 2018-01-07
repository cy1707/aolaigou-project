document.addEventListener("DOMContentLoaded", function(){
    var status = [200,304];
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(status.includes(xhr.status) && xhr.readyState === 4){
            var data = JSON.parse(xhr.responseText);
            console.log(data);
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

})