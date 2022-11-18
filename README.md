# ML_Robot_Nono
 Le projet Robot Nono consiste sur la possibilité d'intégré une caméra dans ce robot et que l'utilisateur (ici le publique visé est un enfant) puisse intérargir avec lui en intégrant une Intelligence Artificielle permettant d'identifier des objets

La première étape du projet et afin de savoir si ce projet est réalisable est de créer un POC

Mon POC est axé sur l'utilisation d'un Modèle pré-entrainé de Machine Learning (ici j'utilise ml5 avec le modèle pré-entrainé COCOSSD) permettant d'identifier un objet sur une image et ensuite de traduire cet objet en anglais afin d'ajouter un côté ludique pour l'enfant

La 2e étape du projet consistera à utiliser la caméra intégré au robot (ici cela sera la webcam de l'ordinateur) en temps réel et d'identifier les objets avec toujours la possibilité de le traduire en anglais.
La particularité de cette étape consistera à créer son propre jeu de données (DataSet) et d'entraîner le modèle sur ce nouveau jeu de données


Axe d'amélioration pour une prochaine mise à jour:

version 1.1 (à venir):
 
 . Ajouter un bouton "Charger une photo", qui va proposer d'aller chercher une photo dans ses propres dossiers de l'ordinateur

 . Lorsqu'on dépose une photo après une autre sans cliquer sur le bouton "Rafraîchir l'image" qui est juste un refresh de la page, lors du clique sur le bouton "Traduction", cela va répéter la traduction autant de fois que l'on a ajouté d'image, à corriger pour que cela se répète qu'une fois pour une même photo même si on en ajoute de plus en plus
 
 . Rendre le site plus responsive lors de l'utilisation d'un appareil mobile
 
version 2.0 (plus tard):
 . Ajouter la version avec l'utilisation de la webcam qui va détecter et identifier en temps réel les objets avec toujours la possibilités de traduire en anglais l'objets identifiés
