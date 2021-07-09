const photographerId = window.location.search.split('?id=')[1]

const photographer = new Photographer()

photographer.onePhotographer(photographerId).then(photographerLibrary=>{
    const info = photographerLibrary[0]
    console.log(info)
    document.getElementById('photograph').insertAdjacentHTML(
        'beforeend',
        `<section class="card">
            <img  loading="lazy" class="avatar" src="./assets/img/Sample Photos/Photographers ID Photos/${info.portrait}" alt="Avatar de l'artiste ${info.name}">
            <div class="artistDescription ">
                <h2 class="artist">${info.name}</h2>
                <p class="localisation">${info.city}, ${info.country}</p>
                <p class="slogan">${info.tagline}</p>
                <p class="price">${info.price}€/jour</p>
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