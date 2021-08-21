import Photographer from "./entity/Photographer.js"

const photographer = new Photographer();
const cardContainer = document.getElementById('cardContainer')

//fetch all photographers list and display as cards as photographers in home page
photographer.allPhotographers().then(list=>{
    for(const photographer of list){
        cardContainer.insertAdjacentHTML(
            'beforeend',
            `<section class="card">
                <div id="${photographer.id}" class="artistDescription" role="link" aria-label="Artiste ${photographer.name}">
                    <div alt="${photographer.name}" tabindex="0">
                        <img class="avatar" loading="lazy" src="./assets/img/Sample Photos/Photographers ID Photos/${photographer.portrait}" alt="Portrait de l'artiste ${photographer.name}">
                        <h2 class="artist">${photographer.name}</h2>
                    </div>
                    <div tabindex="0">
                        <p class="localisation">${photographer.city}, ${photographer.country}</p>
                        <p class="slogan">${photographer.tagline}</p>
                        <p class="price">${photographer.price}€/jour</p>
                    </div>
                </div>
                <ul id="photographer${photographer.id}Tags" class="tags" aria-label="Liste des catégories à laquel l'artiste appartient">
                </ul> 
            </section>`
        );
        for(const tag of photographer.tags){
            document.getElementById(`photographer${photographer.id}Tags`).insertAdjacentHTML(
                'beforeend',
                `<li class="tag ${tag}" role="link" tabindex="0">#${tag}<span class="sr-only">Tag ${tag}</span></li>`
            )
        }
    }
    
    //add click event on each card (excluding tags) and redirect to photoprapher page with id at url parameter
    let photographerCard = document.getElementsByClassName('artistDescription')
    for(const card of photographerCard){
        card.addEventListener("click", function(){
            document.location.href=`photographer.html?id=${card.id}`
        })
        card.addEventListener("keydown", function(e){
            if(e.code === 'Space' || e.code === 'Enter'){
                document.location.href=`photographer.html?id=${card.id}`
            }
        })
    }  
});


let scrollToTop = document.getElementsByClassName('scrollToTop')[0]
//watch scrolling level for scrollToTop button display
document.addEventListener("scroll",function(){ 
    if(window.scrollY>100){
        scrollToTop.style.display='block';
    }else{
        scrollToTop.style.display='none'
    }
}) 

//scroll to the top of the page
scrollToTop.addEventListener("click",function(){
    scrollToTop.style.display='none';
    window.scrollTo({left:0,top:0, behavior:'smooth'})
})
scrollToTop.onkeydown = (e) =>{
    if(e.code === 'Space' || e.code === 'Enter'){
        scrollToTop.style.display='none';
        window.scrollTo({left:0,top:0, behavior:'smooth'})
    }
}

//wait for all DOM (html AND scripted tags rendering) to be loaded to implement tag filter
window.onload = function(){
    const tagFilters = document.getElementsByClassName('tag')
    for (const tagFilter of tagFilters){
        tagFilter.addEventListener("click", ()=>{
            let tagName = tagFilter.getAttribute('class')
            tagName = tagName.split(' ')[1]
            photographer.taggedPhotographers(tagName).then(list=>{
                let sections = cardContainer.getElementsByTagName('section')
                
                for (const section of sections){
                    if(list.includes(parseInt(section.firstElementChild.id)) == false){
                        section.style.display = 'none'
                    }else{
                        section.style.display = 'block'
                    }
                }
            }) 
        })
    }
}