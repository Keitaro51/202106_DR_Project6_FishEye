import Photographer from "./class/Photographer.js"
import Tools from "./class/Tools.js"

const photographer = new Photographer();
const tool = new Tools()
const cardContainer = document.getElementById('cardContainer')

tool.homepageReload();

//fetch all photographers list and display as cards as photographers in home page
photographer.allPhotographers().then(list=>{
    for(const photographer of list){
        cardContainer.insertAdjacentHTML(
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
                `<span class="tag ${tag}">#${tag}</span>`
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

//wait for all DOM (html AND scripted tags rendering) to be loaded to implement tag filter
window.onload = function(){
    let tags = document.getElementsByClassName('tag')
    for (const tag of tags){
        tag.addEventListener("click", function(){let tagName = tag.getAttribute('class')
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