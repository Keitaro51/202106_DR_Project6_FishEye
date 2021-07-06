P6_charlot_romain
Depuis quelques semaines, vous êtes développeur junior chez Techasite, une société de conseil spécialisée dans le développement de sites web et d'applications mobiles.

Avec votre cheffe Amanda et le Designer UI, vous venez de faire une réunion de lancement du projet avec un nouveau client, FishEye. FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux. Ils ont récemment levé des fonds et aimeraient mettre à jour leur site web. 

Après la réunion de lancement, vous voyez un mail de votre cheffe concernant le projet FishEye. Vous l'ouvrez immédiatement :

    Objet : Réunion de lancement FishEye
    De : Amanda
    À : Moi

    Salut, 

    Merci d'avoir participé à la réunion de ce matin ! Pour résumer, notre objectif est de construire un prototype fonctionnel d'un nouveau site web que nous pourrons présenter à FishEye lors de notre prochaine réunion avec les clients. Tu seras chargé de fournir tout le HTML, le CSS et le JavaScript nécessaires au prototype. Notre équipe de back-end intégrera le système existant de FishEye une fois que tu auras terminé le code pour ta partie du projet.

    Pour t’aider à démarrer, voici toutes les informations que j'ai recueillies auprès du client :

        Mes notes de réunion détaillant les principales fonctionnalités et les exigences techniques à mettre en œuvre. 
        Les maquettes approuvées, développées par notre designer. Tu vas créer une page principale ainsi qu’une page avec les informations pour chaque photographe de l’échantillon. 
        Des exemples de photos et de vidéos de FishEye, que tu devras utiliser pour la conception des pages. 
        Des exemples de données au format JSON, que tu pourras utiliser pour créer les différentes pages des photographes de façon dynamique. Ce format imite la structure des données dans la base de données, donc ne modifie pas les données existantes. La seule modification que tu peux réaliser est l'ajout d'un champ JSON pour la description de chaque image (pour les lecteurs d'écran). Tu devras te débrouiller seul pour y parvenir.

    Bien que le site web soit un prototype, il devrait correspondre aux maquettes et fonctionner correctement (pas d'erreurs). Comme l'a mentionné le client lors de la réunion de lancement, sa priorité absolue est l'accessibilité. Veille à construire le site conformément aux exigences d'accessibilité indiquées dans mes notes (par ex. utiliser les balises ARIA, assurer la navigation au clavier, passer au vérificateur d’accessibilité comme AChecker, etc.).

    Une fois que tu m'auras envoyé un repo GitHub avec le code complété, nous passerons en revue et vérifierons toutes les fonctionnalités des pages. Je te demanderai également de faire une démonstration de la navigation du site au moyen du clavier pour qu’on s’assure qu'il est utilisable par les lecteurs d'écran.  

    De plus, avant de soumettre ton travail, assure-toi qu'il respecte les normes suivantes : 

        Le code est séparé en différents fichiers (HTML avec balises d'accessibilité, CSS, JavaScript).
        ESLint est utilisé (avec les paramètres par défaut) pour t’assurer que ton code est robuste. Ceci est particulièrement facile à intégrer avec l'IDE VSCode.
        Une version moderne (ES6 ou supérieure) de JavaScript est utilisée et les fonctionnalités obsolètes ne sont pas utilisées.
        La programmation orientée objet est utilisée.
        Le code est lisible. Choisis des noms qui ont un sens pour les variables, les fonctions et les classes. Ajoute des commentaires au code si le nom n'indique pas clairement ce qu’il se passe. 

    Bonne chance et montre-moi ce que tu sais faire !

Vous commencez par ouvrir les maquettes pour avoir une idée de ce qui doit être fait : 
Page d'accueil des photographes avec 6 profils visibles de photographes. Pour chacun, plusieurs infos sont affichées (nom, localisation, courte description, tags, prix par jour). Des zones de la page sont délimitées par des rectangles numérotés afin de décrire des zones d'interaction.

Lorsque vous commencez à regarder les maquettes, vous recevez un message de Zoé, une développeuse senior que vous admirez beaucoup. Elle vous a encadré et a effectué un grand nombre de vos révisions de code :

    Zoé : Salut ! Amanda m'a dit qu'elle t'avait chargé de développer le premier prototype du projet FishEye, c'est bien ça ?

    Moi : Oui, je viens de commencer !

    Zoé : Tant mieux pour toi. Je pense que tu apprendras beaucoup au cours du processus. Je voulais juste te donner un petit conseil technique. Amanda a mentionné que FishEye a des vidéos et des photos pour le photographe. C'est une bonne occasion pour utiliser le pattern Factory Method, comme moyen de simplifier la création du bon élément DOM dans le reste du code. 

    Moi : OK, je vais utiliser le pattern Factory Method. Merci encore !

Bon, il semble bien que vous ayez maintenant tous les éléments dont vous avez besoin pour démarrer.  Il est temps de se mettre au travail !
Livrables

Pour ce projet, vous aurez besoin de créer les livrables suivants :

    Un dépôt de code sur GitHub avec des fichiers HTML, CSS et JavaScript. 
    Une version mise à jour du JSON (avec alt-text). 
