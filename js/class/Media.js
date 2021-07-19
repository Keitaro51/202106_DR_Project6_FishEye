export default class Media{
    async photographerAllMedia(photographerid){
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        let mediaLibrary =[]
        for(const media of data[0].media){
            if(media.photographerId == photographerid){
                mediaLibrary.push(media)
            }
        }
        return mediaLibrary
    }

    async oneMedia(id){
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        for(const media of data[0].media){
            if(media.id == id){
                return media
            }
        }
    }

    async totalLikes(photographerid){
        let data = await fetch('../data/FishEyeData.json')
        data = await data.json()
        let sum = 0
        for(const media of data[0].media){
            if(media.photographerId == photographerid){
                sum += media.likes
            }
        }
        return sum
    }
}