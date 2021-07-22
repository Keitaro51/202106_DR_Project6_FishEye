export default class Tools{

    homepageReload(){
        document.getElementById('toHomePage').addEventListener("click",function(){
            location.replace('http://127.0.0.1:5500/public')
        })
        
    }

    mediaType(media, allowControls){
        const name = this.getName()
        if(media.image){
            return `<img  loading="lazy" src="./assets/img/Sample Photos/${name}/${media.image}" alt="${media.tags[0]} + ${media.title}"></img>`
        }else{
            return `<video ${allowControls} preload="metadata" src="./assets/img/Sample Photos/${name}/${media.video}" alt="${media.tags[0]} + ${media.title}"></video>`
        }
    }
    
    getName(){
        let name = JSON.parse(localStorage.getItem('info')).name
        name = name.split(' ')[0].split('-').join(' ') /*set firstname only. Hyphenated  firstname cases*/
        return name
    }
}