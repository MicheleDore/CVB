
POUR QUI EST LE SITE ?
 
Community VideoBox est un'association de production vidéo et education populaire. Chaque année, un group d'amateurs est accompagné par des professionnels de l'audiovisuel à la création d'un court-métrage de A à Z. 
Le projet démarre maintenant sa troisième édition et d'autres activités parallèles pourraient s'ajouter à la principale.
Coté multimédia de l'association: 
Les court-métrages (produits par les amateurs) sont à final ouvert et diffusés à l'intérieur d'une installation déplaçable avec interface homme-machine : une cabine qui s'appelle la Box. L'interface permet à l'utilisateur d'exprimer son avis par rapport au final ouvert sous-forme d'un choix entre deux options. 
Il ne s'agit pas de cinéma interactif, le film ne continue pas après l'interaction sauf que pour confirmer que l'avis du spectateur à été pris en compte.
Ex: si Community videoBox avait produit Inception, le spectateur pourrait laisser son avis -c'est un rêve/c'est la réalité- et l'installation enregistrerait son choix en function de laquelle il verrait DiCaprio dormir(ou pas) à la fin du film.
Dans les événements (expos, festivals, etc) où la cabine est déployé, l'association anime des débats ou ateliers entre spectateurs, en partant justement de l'experience de chaqun dans la cabine et de leur réaction au final ouvert.

 SITE DE COMMUNITY VIDEOBOX
 Objectifs dans l'ordre de priorité:
 1- servire de vitrine aux activités de l'asso.
 2- permettre de reproduire le mécanisme de la cabine qui permet de réagir au final ouvert 
 3- reproduire le débat entre spectateurs/utilisateurs à travers un système de messagerie
 
 STRUCTURE
 Le site est divisé en 3 vues principales, chaqune est accessible à partire de la NavBar est dans la vue Home au scroll:
 1. WORKSHOP : l'activité principale de l'association
        1.1 Contents
        2.2 Calendar
        2.3 Signup
        
 2. PRODUCTION
        2.1 MetaBox
        
 3. SERVICES : les prestations de service de l'association
        3.1 Location de la Box
        3.2 De la Page à l'Image
        3.3 Jeunesse
        
 Les vues Workshop et Services fournissent une vitrine respectivement de l'activité principale et des services proposées, les 2 donnent accés à trois sous-vues accessibles également depuis menus déroulants dans la navBar. Ces menus apparaissent au click (en version mobile et tablette) ou au hover (en version desktop) des vues principales.
 
 La vue PRODUCTION donne accés a une vue unique, la MetaBox, qui permette de regarder les court-métrages produits depuis le début du projet et permet une interaction utilisateur plus poussée.

 
0.1 NAVBAR
 En plus que les accès surmentionnés elle permette à tous moments de révenir à la HomePage et de se connecter en tant qu'utilisateur (ou admin) et de se déconnecter à travers un système d'affichage conditionnel. Avec le même système il est possible pour l'administrateur d'acceder à la vue ADMIN.
 
0.2 LOGIN
 Il s'agit d'un modale qui appelle le composant REGISTER pour les utilisateurs qui n'ont pas encore créé un compte personnel
 
0.3 ADMIN
 Cette vue appelle les composants VideoForm, VideoUpload et VideoUpdate qui permettent à l'administrateur de charger des nouvelles vidéos et/ou séries de videos.

 

PSEUDOCODE

COTE FRONT
1 - Mise en place du composant App
     Composants importées : BrowserRouter,  Routes,  Route, Middleware, Videolist, Nav, les views mentionnées ci-dessus
     Mise en places des routes correspondantes aux views
1.1-Mise en place du composent Reducer pour stocker les données nécessaire à la navigation et du Provider pour fournir le Context
1.2-Mise en place de l'adresse API dans le dossier config

2 - Mise ne place du composant NavBar

3 - Mise en place du composant VideoList pour la récuperation des vidéos en BDD

4 - Mise en place du composant Login pour vérifier les crédentiels de l'utilisateur
4.1 - Mise en place du composant Register qui peut être appelé par l'utilisateur depuis le modal du Login
4.1.1 - Mise en Place des composants CheckForbiddenChar et LengthChecker pour validation des données d'enregistrement
4.2 - Mise en place du composant Logout pour terminer la session

5 - Mise en place du composant MetaBox
5.1 Mise en place du composant SelectChoice pour la récuperation des vidéos nécessaires à l'esperience qui se trouvent en BDD
5.2 Mise en place du composant Comment qui affiche et permet de rentre des commentaires liées à la vidéo séléctionnée en MetBox

6 - Mise en place du Middleware
6.1-Mise en place du fichier config adminpath pour gérer les routes réservées

7 - Mise en place de la vue Admin
7.1 -Mise en place du composant VideoForm pour rentrer les informations rélative au chargement d'un ou plusieurs vidéos
7.2 -Mise en place du composant VideoUpload pour le chargement des vidéos en BDD
7.3 -Mise en place du composent ExtractEditions pour valider l'année correspondante aux vidéos chargées

8 - Mise en place de la vue ERROR 404
    
COTE BACK

1 - Mise en place du server 'app.js' coté back

3 - Mise en place des routes suivantes dans les router coté back
4 - Mise en place des routes suivantes dans les router coté front
5 - Création du controlleur register coté back et de son composant coté front
6 - Création du controlleur login coté back et de son composant coté front
7 - Mise en place du Context React 

CHARGEMENT DES NOUVELLES VIDEOS PRINCIPALES
4 - Dans la page Admin un lien permet de renvoyer au composant formulaire uploadvideo 
2 - création du composant formulaire : ce composant permet à l'admin de rentrer toutes les informations textuelles liées à la video et de les stocker dans le reduceur. 
3 - Au submit le composant renvoye au chargement des vidéo,  il y en a 4 qui sont envoyé dans la BDD table 'vidéo
4 - Au chargement de la dernière vidéo les ids et texte respective sont rentré dans un seul objet dans la table 'interaction'
