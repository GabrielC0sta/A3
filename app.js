let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

nextDom.onclick = function(){
    showSlider('next');
}

prevDom.onclick=function(){
    showSlider('prev')
}




let timeRunning= 3000;
let timeAutoNext= 7000;
let ranTimeOut;
let ranautoRan = ranTimeOut = setTimeout(()=>{
        nextDom.click();
    },timeAutoNext);

function showSlider(type){
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

   if (type === 'next') {
    listItemDom.appendChild(itemSlider[0]);
    thumbnailDom.appendChild(itemThumbnail[0]);
    carouselDom.classList.add('next'); // Corrigido aqui
}else{
    let positionLastItem = itemSlider.length -1;
    listItemDom.prepend(itemSlider[positionLastItem])
    thumbnailDom.prepend(itemThumbnail[positionLastItem])
    carouselDom.classList.add('prev')
    
}
    classTiemout(ranTimeOut);
        timeTimeOut = setTimeout(()=>{
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');

        },timeRunning)
    
    claerTiemout(ranautoRan);
    ranTimeOut = setTimeout(()=>{
        nextDom.click();
    },timeAutoNext)
   
}
