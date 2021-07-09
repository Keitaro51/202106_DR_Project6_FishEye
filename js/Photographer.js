class Photographer {
    
    async allPhotographers(){
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        return data
    }
    
    async taggedPhotographers(tag){
        let taggedArtists =[]
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        //console.log(data[0].photographers)
        for(const artist of data[0].photographers){
            if(artist.tags.includes(tag)){
                taggedArtists.push(`${artist.id}`) //TODO some artists have sport, other have sportS tag
            }
        }
        return taggedArtists
    }
}