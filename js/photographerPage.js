import Photographer from "./class/Photographer.js"
import Media from "./class/Media.js"
import Tools from "./class/Tools.js"

const photographerId = window.location.search.split('?id=')[1]

const photographer = new Photographer()
const mediaLibrary = new Media()
const tool = new Tools()

const mediaContainer = document.getElementById('mediaContainer')
const main = document.getElementById('photograph')
const formModal = document.getElementById('formModal')
const lightbox = document.getElementById('lightbox')
let name = localStorage.getItem('name')
name = name.split(' ')[0].split('-').join(' ') /*set firstname only. Hyphenated  firstname cases*/

tool.homepageReload();

photographer.onePhotographer(photographerId).then(photographerInfo=>{
    const info = photographerInfo[0]
    document.getElementById('photographerInfo').insertAdjacentHTML(
        'beforeend',
        `<img  loading="lazy" class="avatar" src="./assets/img/Sample Photos/Photographers ID Photos/${info.portrait}" alt="Avatar de l'artiste ${info.name}">
        
        <div class="artistDescription ">
            <h2 class="artist">${info.name}</h2>
            <p class="localisation">${info.city}, ${info.country}</p>
            <p class="slogan">${info.tagline}</p>
            <div id="photographer${info.id}Tags" class="tags">
            </div> 
        </div>` 
    );
    for(const tag of info.tags){
        document.getElementById(`photographer${info.id}Tags`).insertAdjacentHTML(
            'beforeend',
            `<span class="tag">#${tag}</span>`
        )
    }
    localStorage.setItem('name', info.name)
    localStorage.setItem('price', info.price)
})

mediaLibrary.photographerAllMedia(photographerId).then(mediaList=>{
    for(const media of mediaList){
        const mediaTag = mediaType(media)
        mediaContainer.insertAdjacentHTML(
            'beforeend',
            `<div id="${media.id}" class="media">
                <figure class="mediaPreview">
                    ${mediaTag}
                    <figcaption>
                        <h3 class="mediaTitle">${media.title}</h3>
                        <p class="mediaLikes"> ${media.likes}</p>
                    </figcaption>
                </figure>
            </div>`
        )
    }
})

mediaLibrary.totalLikes(photographerId).then(totalLikes=>
    document.getElementsByTagName('aside')[0].insertAdjacentHTML(
        'beforeend',
        `<span>${totalLikes}</span>
        <span>${localStorage.getItem('price')}€ / jour</span>`
    )
)


window.onload = function(){
    formModalDisplay();
    lightBox();
}
/*------------------form---------------*/

//display contact modal after contact button is generated
function formModalDisplay(){
    const contactBtn = document.getElementById('contact')
    contactBtn.addEventListener('click', function(){
        formModal.style.display = 'block'
        main.setAttribute('aria-hidden', true)
        formModal.setAttribute('aria-hidden', false)
    })
}

//close contact modal
const closeModal = document.getElementById('closeModal')
closeModal.addEventListener('click', function(){
    formModal.style.display = 'none'
    main.setAttribute('aria-hidden', false)
    formModal.setAttribute('aria-hidden', true)
})
const closeLightbox = document.getElementById('closeLightbox')
closeLightbox.addEventListener('click',function(){
    lightbox.style.display = 'none'
    main.setAttribute('aria-hidden', false)
    lightbox.setAttribute('aria-hidden', true)
})
    


/*------------------lightbox---------------*/

function lightBox(){
    const mediaCollection = mediaContainer.getElementsByClassName('media')
    const lightBoxMedia = document.getElementById('lightBoxMedia')
    for (const media of mediaCollection){
        media.addEventListener('click', function(){
            mediaLibrary.oneMedia(media.id).then(mediaInfo=>{
                const mediaTag = mediaType(mediaInfo, 'controls')
                lightbox.style.display = 'flex'
                lightBoxMedia.innerHTML = ''
                lightBoxMedia.insertAdjacentHTML(
                    'beforeend',
                    `${mediaTag}
                    <h4>${mediaInfo.title}</h4>`
                )
                main.setAttribute('aria-hidden', true)
                lightbox.setAttribute('aria-hidden', false)
            })
        })
    }
}


/*img or video creation tag*/

function mediaType(media, controls){
    let isVideo =''
    if(media.image){
        return `<img  loading="lazy" src="./assets/img/Sample Photos/${name}/${media.image}" alt=""></img>`
    }else{
        isVideo = ' (Video)'
        return `<video ${controls} preload="metadata" src="./assets/img/Sample Photos/${name}/${media.video}"></video>`
    }
}