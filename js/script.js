let logo = document.querySelector('.logo-container');
let header = document.querySelector('header');
let scrollToUp = document.querySelector('.scrollToUp');

logo.addEventListener("click",()=>{
    header.classList.toggle('active');
})

document.addEventListener("scroll",(elt) => {
    if(window.scrollY > 200){
        scrollToUp.classList.add('active');
    }else{
        scrollToUp.classList.remove('active');
    }
})
scrollToUp.addEventListener('click', ()=>{
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})