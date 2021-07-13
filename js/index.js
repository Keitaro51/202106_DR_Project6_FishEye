import Photographer from "./class/Photographer.js"

const photographer = new Photographer();

//fetch all photographers list and display as cards as photographers in home page
photographer.allPhotographers().then(list=>{
   // console.log(list[0].photographers[0])
    for(const photographer of list){
        document.getElementById('cardContainer').insertAdjacentHTML(
            'beforeend',
            `<section class="card">
                <div id="${photographer.id}" class="artistDescription">
                    <img class="avatar" loading="lazy" src="./assets/img/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="Avatar de l'artiste ${photographer.name}">
                    <h3 class="artist">${photographer.name}</h3>
                    <p class="localisation">${photographer.city}, ${photographer.country}</p>
                    <p class="slogan">${photographer.tagline}</p>
                    <p class="price">${photographer.price}€/jour</p>
                </div>
                <div id="photographer${photographer.id}Tags" class="tags">
                </div> 
            </section>`
        );
        for(const tag of photographer.tags){
            document.getElementById(`photographer${photographer.id}Tags`).insertAdjacentHTML(
                'beforeend',
                `<span class="tag">#${tag}</span>`
            )
        }
    }
    
    //add click event on each card (excluding tags) and redirect to photoprapher page with id at url parameter
    let photographerCard = document.getElementsByClassName('artistDescription')
    for(const card of photographerCard){
        card.addEventListener("click", function(){
            document.location.href=`photographer.html?id=${card.id}`
        })
    }  
});

//watch scrolling level for scrollToTop button display
document.addEventListener("scroll",function(){
    let cta = document.getElementsByClassName('scrollToTop')[0] 
    if(window.scrollY>50){
        cta.style.display='block'; //TODO se déclenche même si invisible si media query <1024px
    }else{
        cta.style.display='none'
    }
}) //TODO click listener on scrolltotop btn

//photographer.taggedPhotographers('events') //TODO when click on a tag, return all photographers id possessing this tag