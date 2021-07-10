const photographerId = window.location.search.split('?id=')[1]

const photographer = new Photographer()
const mediaLibrary = new Media()

photographer.onePhotographer(photographerId).then(photographerInfo=>{
    const info = photographerInfo[0]
    document.getElementById('photograph').insertAdjacentHTML(
        'afterbegin',
        `<section class="card">
            <img  loading="lazy" class="avatar" src="./assets/img/Sample Photos/Photographers ID Photos/${info.portrait}" alt="Avatar de l'artiste ${info.name}">
            <div class="artistDescription ">
                <h2 class="artist">${info.name}</h2>
                <p class="localisation">${info.city}, ${info.country}</p>
                <p class="slogan">${info.tagline}</p>
                <div id="photographer${info.id}Tags" class="tags">
                </div> 
            </div>
        </section>` 
    );
    for(const tag of info.tags){
        document.getElementById(`photographer${info.id}Tags`).insertAdjacentHTML(
            'beforeend',
            `<span class="tag">#${tag}</span>`
        )
    }
})

mediaLibrary.photographerAllMedia(photographerId).then(mediaList=>{
    for(const media of mediaList){
        document.getElementById('mediaContainer').insertAdjacentHTML(
            'beforeend',
            `<div id="${media.id}" class="media">
                <figure class="mediaPreview">
                    <img  loading="lazy" src="./assets/img/Sample Photos/Mimi/${media.image}" alt="">
                    <figcaption>
                        <h3 class="mediaTitle">${media.title}</h3>
                        <p class="mediaLikes"> ${media.likes}</p>
                    </figcaption>
                </figure>
            </div>`
        )
    }
})