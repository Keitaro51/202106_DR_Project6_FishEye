import Photographer from "./class/Photographer.js"
import Media from "./class/Media.js"

const photographerId = window.location.search.split('?id=')[1]

const photographer = new Photographer()
const mediaLibrary = new Media()

photographer.onePhotographer(photographerId).then(photographerInfo=>{
    const info = photographerInfo[0]
    document.getElementById('photographerInfo').insertAdjacentHTML(
        'beforeend',
        `<img  loading="lazy" class="avatar" src="./assets/img/Sample Photos/Photographers ID Photos/${info.portrait}" alt="Avatar de l'artiste ${info.name}">
        <button>Contactez-moi</button>
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
    let name = localStorage.getItem('name')
    name = name.split(' ')[0].split('-').join(' ') /*set firstname only. Hyphenated  firstname cases*/
    
    for(const media of mediaList){
        let mediaTag =''
        let isVideo =''
        if(media.image){
            mediaTag=`<img  loading="lazy" src="./assets/img/Sample Photos/${name}/${media.image}" alt=""></img>`
        }else{
            isVideo = ' (Video)'
            mediaTag=`<video preload="metadata" src="./assets/img/Sample Photos/${name}/${media.video}"></video>`
        }
        document.getElementById('mediaContainer').insertAdjacentHTML(
            'beforeend',
            `<div id="${media.id}" class="media">
                <figure class="mediaPreview">
                    ${mediaTag}
                    <figcaption>
                        <h3 class="mediaTitle">${media.title}${isVideo}</h3>
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