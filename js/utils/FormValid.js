export default class FormValid{
    constructor(){
        this.errorTab = []
    }
    validation(firstname, lastname, email){
        let namePattern = /^\p{Letter}{2,}((\s|-)*\p{Letter}*)*$/u
        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(namePattern.test(firstname) === false){
            this.errorTab.push('Le prénom doit contenir au moins 2 lettres et aucun chiffre')
        }

        if(namePattern.test(lastname) === false){
            this.errorTab.push('Le nom doit contenir au moins 2 lettres et aucun chiffre')
        }
        
        if(email === '' || emailPattern.test(email) === false){
            this.errorTab.push('Format d\'email invalide')
        }
        

        const errorContainer = document.getElementById('errorContainer')
        const errorList = errorContainer.getElementsByTagName('ul')[0]

        if(this.errorTab.length>0){
            errorList.innerHTML = ''
            errorContainer.style.display = "block"
            errorContainer.setAttribute('aria-hidden', true)
            for(const error of this.errorTab){
                errorList.insertAdjacentHTML('afterbegin', `<li>${error}</li>`)
            }
            this.errorTab = []
        }
    }
}