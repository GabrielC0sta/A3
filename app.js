let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

nextDom.onclick = function(){
    showSlider('next');
}

prevDom.onclick = function(){
    showSlider('prev');
}

let timeRunning = 3000;
let timeAutoNext = 7000;
let ranTimeOut;
let ranautoRan = ranTimeOut = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type){
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    } else {
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(ranTimeOut);
    ranTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(ranautoRan);
    ranautoRan = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);

    updateTopicColorByItem(); // 👈 Atualiza a cor da .topic
}

// ✅ Função que define a cor com base no atributo data-color do item visível
function updateTopicColorByItem() {
    const items = document.querySelectorAll('.carousel .list .item');
    const currentItem = items[0]; // o item ativo é sempre o primeiro
    const topic = currentItem.querySelector('.topic');
    const color = topic?.getAttribute('data-color'); 

    if (topic && color) {
        topic.style.color = color;
    }
}

// Chamar uma vez ao carregar a página
updateTopicColorByItem();
