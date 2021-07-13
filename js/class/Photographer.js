export default class Photographer {
     
    async allPhotographers(){
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        return data[0].photographers
    }
    
    async taggedPhotographers(tag){
        let taggedArtists =[]
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        //console.log(data[0].photographers)
        for(const artist of data[0].photographers){
            if(artist.tags.includes(tag)){
                taggedArtists.push(artist.id)
            }
        }
        return taggedArtists
    }

    async onePhotographer(id){
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        let photographerInfo =[]
        for(const artist of data[0].photographers){
            if(artist.id == id){
                photographerInfo.push(artist)
            }
        }
        return photographerInfo 
    }

}