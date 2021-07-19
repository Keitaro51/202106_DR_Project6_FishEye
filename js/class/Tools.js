export default class Tools{

    homepageReload(){
        document.getElementById('toHomePage').addEventListener("click",function(){
            location.replace('http://127.0.0.1:5500/public')
        })
    }
}