class Media{
    async photographerAllMedia(id){
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        let mediaLibrary =[]
        for(const media of data[0].media){
            if(media.photographerId == id){
                mediaLibrary.push(media)
            }
        }
        return mediaLibrary
    }
}