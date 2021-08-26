import Photographer from "./entity/Photographer.js"
import Media from "./entity/Media.js"
import Mediafactory from "./utils/Mediafactory.js"
import SortBy from "./component/SortBy.js"
import FormValid from "./utils/FormValid.js"

const photographerId = window.location.search.split('?id=')[1]

const photographer = new Photographer()
const mediaLibrary = new Media()
const sort = new SortBy()
const formValid = new FormValid()
const mediaFactory = new Mediafactory()

const mediaContainer = document.getElementById('mediaContainer')
const main = document.getElementById('photograph')
const formModal = document.getElementById('formModal')
const lightbox = document.getElementById('lightbox')

sort.selectDisplay()    

photographer.onePhotographer(photographerId).then(photographerInfo=>{
    const info = photographerInfo[0]
    document.getElementById('photographerInfo').insertAdjacentHTML(
        'beforeend',
        `<img  loading="lazy" class="avatar" src="./assets/img/Sample Photos/Photographers ID Photos/${info.portrait}" alt="${info.alt}" tabindex="0">
        
        <div class="artistDescription">
            <h1 class="artist" tabindex="0">${info.name}</h1>
            <div tabindex="0">
                <p class="localisation">${info.city}, ${info.country}</p>
                <p class="slogan">${info.tagline}</p>
            </div>
            <div id="photographer${info.id}Tags" class="tags">
            </div> 
        </div>` 
    );
    for(const tag of info.tags){
        document.getElementById(`photographer${info.id}Tags`).insertAdjacentHTML(
            'beforeend',
            `<span tabindex="0" class="tag" role="link">#${tag}</span>`
        )
    }

    const tagFilters = document.getElementsByClassName('tag')
    for(const tagFilter of tagFilters){
        tagFilter.addEventListener('click', () => filter(tagFilter.innerHTML.substring(1)))
        tagFilter.addEventListener('keydown', (e) => {
            if(e.code == 'Space' || e.code =='Enter'){
                filter(tagFilter.innerHTML.substring(1))
            }
        })

    }
    
    localStorage.setItem('info', JSON.stringify({"name":`${info.name}`,"price":`${info.price}`}))
    
})

mediaLibrary.photographerAllMedia(photographerId).then(mediaList=>{
    //display all media for selected photographer
    renderAllMedia(mediaList)
    /*Waiting for full DOM generation with all datas before allowing some functions call */
     lightBoxDisplay();     
     formModalDisplay();
    
    
    //sort media as user selected (reinit tag filters)
    const originalSelect = document.getElementById('sortBy')
    const newCustomSelect = document.getElementsByClassName('select-selected')[0]
    let value = originalSelect.value
    newCustomSelect.addEventListener('click', sortSelect)
    newCustomSelect.addEventListener('change', sortSelect)   
    function sortSelect(){
        if(originalSelect.value != value){
            value = originalSelect.value
            switch(value){
                case 'popularity':{
                    const mediaListByPopularity = sort.sortByLikes(mediaList)
                    renderAllMedia(mediaListByPopularity)
                    break}
                case 'date':{
                    const mediaListByDate = sort.sortByDate(mediaList)
                    renderAllMedia(mediaListByDate)
                    break}
                case 'title':{
                    const mediaListByTitle = sort.sortByTitle(mediaList)
                    renderAllMedia(mediaListByTitle)
                    break}
                default :
                    renderAllMedia(mediaList)
            }
        }
        lightBoxDisplay()
    }
})



/**
 * render all current artist medias
 *
 * @param   {HTMLCollection}  mediaList  [media list]
 */
function renderAllMedia(mediaList){
    mediaContainer.innerHTML =''
    for(const media of mediaList){
        const mediaHtmlTag = mediaFactory.mediaType(media)
        mediaContainer.insertAdjacentHTML(
            'beforeend',
            `<div id="${media.id}" class="media ${media.tags}" role="link">
                <figure class="mediaPreview">
                    ${mediaHtmlTag}
                    <figcaption>
                        <h2 class="mediaTitle" tabindex="0">${media.title}</h2>
                        <p class="mediaLikes" aria-label="likes" tabindex="0">${media.likes}</p>
                    </figcaption>
                </figure>
            </div>`
        )
    }
    const likeBtn = Array.from(document.getElementsByClassName('mediaLikes'))
    likeBtn.forEach(btn => {
        btn.addEventListener('click',(e)=>{
            mediaLibrary.addLike(e)
        })
        btn.addEventListener('keydown',(e)=>{
            if(e.code == 'Enter'){
            mediaLibrary.addLike(e)
            }
        })
    })
        
}

mediaLibrary.totalLikes(photographerId).then(totalLikes=>{
    let price = JSON.parse(localStorage.getItem('info')).price
    document.getElementsByTagName('aside')[0].insertAdjacentHTML(
        'beforeend',
        `<span>${totalLikes}</span>
        <span>${price}€ / jour</span>`
    )
})

/**
 * tag filter
 *
 * @param   {string}  tagFilter  [tagFilter name]
 */
function filter(tagFilter){
    const mediaHTMLCollection = document.getElementsByClassName('media')
          
    for(const media of mediaHTMLCollection){
        if(media.className != `media ${tagFilter}`){
            media.style.display = 'none'
        }else{
            media.style.display = 'block'
        }
    }
}

/**
 * display contact modal (form) after contact button is generated
 *
 */
function formModalDisplay(){
    const contactArtist = document.getElementById('contactArtist')
    contactArtist.innerHTML = `Contactez moi <br> ${JSON.parse(localStorage.getItem('info')).name}`
    const contactBtn = document.getElementById('contact')
    contactBtn.addEventListener('click', function(){
        formModal.style.display = 'block'
        main.setAttribute('aria-hidden', true)
        formModal.setAttribute('aria-hidden', false)
        document.getElementById('firstname').focus()
    })
    close('closeModal', formModal)
}

const form = document.getElementsByTagName('form')[0]
form.onsubmit = ()=>{
    let firstname = document.getElementById('firstname').value
    let lastname = document.getElementById('lastname').value
    let email = document.getElementById('email').value  
    let msg = document.getElementById('message').value
    formValid.validation(firstname, lastname, email, msg)
    
    return false //avoid page redirection
}

/**
 * lightBox (navigation between medias) display
 */
function lightBoxDisplay(){
    const mediaCollection = mediaContainer.getElementsByClassName('media')
    for (const media of mediaCollection){
        const mediaPreview = media.firstElementChild.firstElementChild
        mediaPreview.addEventListener('click', () =>{renderLightbox(media)})
        //mediaPreview.onclick = () =>{renderLightbox(media)}
        
        keyboardNav(mediaPreview,[['Space','Enter'],[media]])
    }
    close('closeLightbox', lightbox)
    
}

/**
 * lightbox rendering depending on choosen media
 * @param {HTMLElement} media - one media 
 */
function renderLightbox(media){
    const lightBoxMedia = document.getElementById('lightBoxMedia')
    mediaLibrary.oneMedia(media.id).then(mediaInfo=>{
        const mediaHtmlTag = mediaFactory.mediaType(mediaInfo, 'controls')
        lightbox.style.display = 'flex'
        lightBoxMedia.innerHTML = ''
        lightBoxMedia.insertAdjacentHTML(
            'beforeend',
            `${mediaHtmlTag}
            <h4 tabindex="0">${mediaInfo.title}</h4>`
        )
        main.setAttribute('aria-hidden', true)
        lightbox.setAttribute('aria-hidden', false)
        lightboxNavigation(media)
    })
}


/**
 * previous/next functions (click + keyboard)
 *
 * @param   {HTMLElement}  media  [current displayed media]
 *
 */function lightboxNavigation(media){
    const previousBtn = document.getElementById('previousMedia')
    const nextBtn = document.getElementById('nextMedia')
    let previousMedia
    let nextMedia
    nextBtn.focus()

    //cyclic behaviours
    media == media.parentNode.firstElementChild ? previousMedia = media.parentNode.lastElementChild : previousMedia = media.previousElementSibling
    media == media.parentNode.lastElementChild ? nextMedia = media.parentNode.firstElementChild : nextMedia = media.nextElementSibling

    //filtered media and some particular cases
    while(previousMedia.style.display == 'none'){
        previousMedia = previousMedia.previousElementSibling
        if(previousMedia == media){break}
        if(previousMedia == media.parentNode.firstElementChild){previousMedia = media.parentNode.lastElementChild}
    }
    while(nextMedia.style.display == 'none'){
        nextMedia = nextMedia.nextElementSibling
        if(nextMedia == media){break}
        if(nextMedia == media.parentNode.lastElementChild){nextMedia = media.parentNode.firstElementChild}
    }

    previousBtn.onclick = ()=>renderLightbox(previousMedia)
    nextBtn.onclick = ()=>renderLightbox(nextMedia)

    keyboardNav(previousBtn,[['Space','Enter'],[previousMedia]])
    keyboardNav(nextBtn,[['Space','Enter'],[nextMedia]])
    keyboardNav(lightbox, [['ArrowLeft','ArrowRight'], [previousMedia, nextMedia]])

    // previousBtn.onkeydown = (e)=>{
    //     if(e.code === 'Space' || e.code === 'Enter'){
    //         renderLightbox(previousMedia)    
    //     }
    // }
    // nextBtn.onkeydown = (e)=>{
    //     if(e.code === 'Space' || e.code === 'Enter'){
    //         renderLightbox(nextMedia)    
    //     }
    // }

    // lightbox.onkeydown = (e) =>{
    //     if(e.code === 'ArrowLeft'){
    //         renderLightbox(previousMedia)
    //     }else if(e.code === 'ArrowRight'){
    //         renderLightbox(nextMedia)
    //     }
    // }  
}

/**
 * keybord nav with and without focus
 *
 * @param   {HTMLElement}  elt    [context element]
 * @param   {Array}  array  [[key list] , [action list]]
 *
 */
 function keyboardNav(elt,array){
    elt.onkeydown = (e)=>{
        for(let i= 0; i<array.length; i++){
            if(e.code === array[0][i]){
                if(!array[1][i]){
                    renderLightbox(array[1][array[1].length-1])
                }else{
                    renderLightbox(array[1][i])
                }    
            }
        }
    }
}

/**
 * close modal or lightbox depending of event
 *
 * @param   {string}  eltId    closeModal or closeLightbox
 * @param   {HTMLElement}  eltName  formModal or lightbox
 *       
 */ 
function close(eltId, eltName){
    //cross btn click
    const closeElt = document.getElementById(eltId)
    closeElt.addEventListener('click', function(){
        hideOnClosure(eltName)
    })
    //or escape key press
    eltName.addEventListener('keydown', e=>{
        if(e.code === 'Escape'){
            hideOnClosure(eltName)   
        }
    })
    //or key press on cross focus
    closeElt.addEventListener('keydown', e=>{
        if(e.code === 'Enter' || e.code === 'Space'){
            hideOnClosure(eltName)  
        }
    })
}

/**
 * refactored sub-function for close()
 *
 * @param   {HTMLElement}  eltName  [eltName description]
 *
 */
function hideOnClosure(eltName){
    eltName.style.display = 'none'
    main.setAttribute('aria-hidden', false)
    eltName.setAttribute('aria-hidden', true)
}