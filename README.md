# ML_Robot_Nono
 Le projet Robot Nono consiste sur la possibilité d'intégré une caméra dans ce robot et que l'utilisateur (ici le publique visé est un enfant) puisse intérargir avec lui en intégrant une Intelligence Artificielle permettant d'identifier des objets

La première étape du projet et afin de savoir si ce projet est réalisable est de créer un POC

Mon POC est axé sur l'utilisation d'un Modèle pré-entrainé de Machine Learning permettant d'identifier un objet sur une image et ensuite de traduire cet objet en anglais afin d'ajouter un côté ludique pour l'enfant

La 2e étape du projet consistera à utiliser la caméra (intégré au robot) en temps réel et d'identifier les objets avec toujours la possibilité de le traduire en anglais.
La particularité de cette étape consistera à créer son propre jeu de données (DataSet) et d'entraîner le modèle sur ce nouveau jeu de données

Ici j'utilise ml5 avec le modèle pré-entrainé COCOSSD
