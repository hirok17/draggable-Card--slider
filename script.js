const carosul =document.querySelector(".carousel");
const arrowBtn =document.querySelectorAll(".wrapper i");
const firstCartWith =carosul.querySelector('.card').offsetWidth;
const cartList =[...carosul.children];
 
 
let isDragging =false, startX, startScrollLeft, timeOutId;

let cardperViwe =Math.round(carosul.offsetWidth / firstCartWith);

cartList.slice(-cardperViwe).reverse().forEach(card=>{
    carosul.insertAdjacentHTML("afterbegin", card.outerHTML);
});
cartList.slice(0, cardperViwe).forEach(card=>{
    carosul.insertAdjacentHTML("beforeend", card.outerHTML);
});
arrowBtn.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        carosul.scrollLeft +=btn.id ==='left' ? -firstCartWith : firstCartWith;
    })
})
const dragStart =(e)=>{
    isDragging=true;
    carosul.classList.add('dragging');
    startX =e.pageX;
    console.log(startX);
    startScrollLeft =carosul.scrollLeft;
    console.log(startScrollLeft);
}
const dragging =e=>{
    if(!isDragging) return;
    let hello =startScrollLeft - (e.pageX - startX);
     carosul.scrollLeft= hello;
     console.log(hello);
}
const dragStop =()=>{
    isDragging =false;
    carosul.classList.remove('dragging');
}

const infinitySroll =()=>{
    if(carosul.scrollLeft ===0){
        carosul.classList.add('no-transition');
        carosul.scrollLeft =carosul.scrollWidth - (2 * carosul.offsetWidth);
        carosul.classList.remove('no-transition');
    }else if(Math.ceil(carosul.scrollLeft) === carosul.scrollWidth - carosul.offsetWidth){
        carosul.classList.add('no-transition');
        carosul.scrollLeft =carosul.offsetWidth;
        carosul.classList.remove('no-transition');
    }
}
carosul.addEventListener('mousedown', dragStart);
carosul.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carosul.addEventListener('scroll', infinitySroll);