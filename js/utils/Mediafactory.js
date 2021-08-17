export default class Mediafactory{
   
    mediaType(media, allowControls){
        const name = this.getName()
        if(media.image){
            return `<img  tabindex="0" loading="lazy" src="./assets/img/Sample Photos/${name}/${media.image}" alt="${media.tags[0]} - ${media.title}"></img>`
        }else{
            return `<video tabindex="0" ${allowControls} preload="metadata" src="./assets/img/Sample Photos/${name}/${media.video}" alt="${media.tags[0]} - ${media.title}"></video>`
        }
    }
    
    getName(){
        let name = JSON.parse(localStorage.getItem('info')).name
        name = name.split(' ')[0].split('-').join(' ') /*set firstname only. Hyphenated  firstname cases*/
        return name
    }
}