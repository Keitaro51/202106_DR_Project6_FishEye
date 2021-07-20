import Photographer from "./utils/Photographer.js"
import Media from "./utils/Media.js"
import Tools from "./utils/Tools.js"

const photographerId = window.location.search.split('?id=')[1]

const photographer = new Photographer()
const mediaLibrary = new Media()
const tool = new Tools()

const mediaContainer = document.getElementById('mediaContainer')
const main = document.getElementById('photograph')
const formModal = document.getElementById('formModal')
const lightbox = document.getElementById('lightbox')

tool.homepageReload();

photographer.onePhotographer(photographerId).then(photographerInfo=>{
    const info = photographerInfo[0]
    document.getElementById('photographerInfo').insertAdjacentHTML(
        'beforeend',
        `<img  loading="lazy" class="avatar" src="./assets/img/Sample Photos/Photographers ID Photos/${info.portrait}" alt="Avatar de l'artiste ${info.name}">
        
        <div class="artistDescription">
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

    const tagFilters = document.getElementsByClassName('tag')
    for(const tagFilter of tagFilters){
        tagFilter.addEventListener('click', () => filter(tagFilter.innerHTML.substring(1)))
    }
    
    localStorage.setItem('info', JSON.stringify({"name":`${info.name}`,"price":`${info.price}`}))
    
})

mediaLibrary.photographerAllMedia(photographerId).then(mediaList=>{
    for(const media of mediaList){
        const mediaHtmlTag = mediaType(media)
        mediaContainer.insertAdjacentHTML(
            'beforeend',
            `<div id="${media.id}" class="media ${media.tags}">
                <figure class="mediaPreview">
                    ${mediaHtmlTag}
                    <figcaption>
                        <h3 class="mediaTitle">${media.title}</h3>
                        <p class="mediaLikes"> ${media.likes}</p>
                    </figcaption>
                </figure>
            </div>`
        )
    }
})

mediaLibrary.totalLikes(photographerId).then(totalLikes=>{
    let price = JSON.parse(localStorage.getItem('info')).price
    document.getElementsByTagName('aside')[0].insertAdjacentHTML(
        'beforeend',
        `<span>${totalLikes}</span>
        <span>${price}€ / jour</span>`
    )
})
/*------------------tag filter----------------*/
function filter(tagFilter){
    const mediaHTMLCollection = document.getElementsByClassName('media')
    for(const media of mediaHTMLCollection)
        if(media.className != `media ${tagFilter}`){
            media.style.display = 'none'
        }else{
            media.style.display = 'block'
        }
}

/*Waiting for full DOM generation with all datas before allowing some functions call */
window.onload = function(){
    formModalDisplay();
    lightBoxDisplay();
    close('closeModal', formModal)
    close('closeLightbox', lightbox)
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

/*------------------lightbox---------------*/

function lightBoxDisplay(){
    const mediaCollection = mediaContainer.getElementsByClassName('media')
    for (const media of mediaCollection){
        media.addEventListener('click', ()=>renderLightbox(media)) 
    }
}

function renderLightbox(media){
    const lightBoxMedia = document.getElementById('lightBoxMedia')
    mediaLibrary.oneMedia(media.id).then(mediaInfo=>{
        const mediaHtmlTag = mediaType(mediaInfo, 'controls')
        lightbox.style.display = 'flex'
        lightBoxMedia.innerHTML = ''
        lightBoxMedia.insertAdjacentHTML(
            'beforeend',
            `${mediaHtmlTag}
            <h4>${mediaInfo.title}</h4>`
        )
        main.setAttribute('aria-hidden', true)
        lightbox.setAttribute('aria-hidden', false)
        lightboxNavigation(media)
    })
}

function lightboxNavigation(media){
    const previousBtn = document.getElementById('previousMedia')
    const nextBtn = document.getElementById('nextMedia')
    media == media.parentNode.firstElementChild ? previousBtn.style.display = 'none' : previousBtn.style.display = 'inline-block'
    media == media.parentNode.lastElementChild ? nextBtn.style.display = 'none' : nextBtn.style.display = 'inline-block'

    previousBtn.onclick = ()=>renderLightbox(media.previousElementSibling)
    nextBtn.onclick = ()=>renderLightbox(media.nextElementSibling)
}

function close(eltId, eltName){
    const closeElt = document.getElementById(eltId)
    closeElt.addEventListener('click', function(){
        eltName.style.display = 'none'
        main.setAttribute('aria-hidden', false)
        eltName.setAttribute('aria-hidden', true)
    })
}

/*img or video creation tag*/
function mediaType(media, allowControls){
    const name = getName()
    if(media.image){
        return `<img  loading="lazy" src="./assets/img/Sample Photos/${name}/${media.image}" alt="${media.tags[0]} + ${media.title}"></img>`
    }else{
        return `<video ${allowControls} preload="metadata" src="./assets/img/Sample Photos/${name}/${media.video}" alt="${media.tags[0]} + ${media.title}"></video>`
    }
}

function getName(){
    let name = JSON.parse(localStorage.getItem('info')).name
    name = name.split(' ')[0].split('-').join(' ') /*set firstname only. Hyphenated  firstname cases*/
    return name
}