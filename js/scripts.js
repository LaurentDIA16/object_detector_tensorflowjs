//Frigo fonctionnel 2 ______________________________________________________

let wordEn;
let wordFr;


document.addEventListener('DOMContentLoaded', () => {
  handleDrop()
})

// Création de la balise img
let img_to_detec = document.createElement('img');

// Ici qu'on lance la detection automatique lorsque l'image est droper dans le cadre 
img_to_detec.addEventListener('load', () => {
    console.log('ready: ', img_to_detec);

    //Chargement du modèle pré-entrainer cocossd
    detector = ml5.objectDetector('cocossd');
})

// Fonction pour écouter le drop d'image
function handleDrop(){
    const image_drop_area = document.querySelector("#image_drop_area");
    
    // création bouton (Lancez la détection), lancement de la fonction detectObjAffichage à son appui
    const detecte_obj_btn = document.getElementById('detect_obj')
    detecte_obj_btn.addEventListener('click', ()=>{
      detectObjAffichage(img_to_detec)
    })

    image_drop_area.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy'; //Copie de la donnée glisser vers le lieu de dépôt
    });

    image_drop_area.addEventListener('drop', (event) => {
      event.stopPropagation(); //évite que l'évènement se propage plus loin
      event.preventDefault(); //empêche l'action par défaut de l'évènement

      //Création variable fileList pour récupérer les infos de l'image déposer
      const fileList = event.dataTransfer.files;
      
      //Activation de la fonction ImageReader avec les infos de fileList 
      ImageReader(fileList[0]);
    });
 
    function ImageReader(file){
      //Création d'une nouvelle instance de la classe FileReader
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
          
          //Création de la variable pour récupérer les données source de l'image
          uploaded_image = event.target.result;
          
          //Ajout de l'attribut src(données source de l'image) à la balise img créé plus haut
          document.querySelector("#image_drop_area").style.backgroundImage = `url(${uploaded_image})`;
          img_to_detec.src = uploaded_image
      });

      //Lire le contenu de file et restitué sous la forme d'une URL de donnée ensuite renvoi dans la balise img l'attribut src
      reader.readAsDataURL(file);
    }
}

// fonction pour identifier les objets sur l'image et proposer la traduction
function detectObjAffichage(image){
  // Lancement de l'identification de l'objet
  detector.detect(image,function(error, result){
    if(error) {
      console.error(error);
      return;
    }

    // Récupère le label (nom) de l'objet détecter et la précision (confidence)
    wordEn = result[0].label;
    let confidence = result[0].confidence;

    // Boucle dans le dictionnaire fr-en
    for(let key in dico){
      if (key == wordEn){ //si la clé est égale au mot à traduire
        wordFr = dico[key]; //créé une variable avec le mot traduit
        document.querySelector("#obj_detect").textContent = wordFr; //ajouter le mot fr sur la page HTML id obj_detect
      }
    }
    // Calcul de la précision en % et ajout dans l'id obj_confidence 
    document.querySelector("#obj_confidence").textContent = 100 * confidence.toFixed(2) + " %";
  });
  
  //Création bouton (Lancez la traduction)
  let elementsButton = document.getElementsByTagName("button"); 
  let buttonTr = elementsButton[6];
  
  buttonTr.addEventListener('click', () => {
    document.getElementById("wordEn").innerHTML = wordEn;

    //Créer une variable qui récupère le mot en anglais dans id wordEn pour futur traduction en français
    wordToTrad = document.getElementById("wordEn").innerText;

    //boucle dans le dictionnaire "dico" pour retrouver le mot à traduire en-fr
    for(let key in dico){
      if (key == wordToTrad){ //si la clé est égale au mot à traduire
        let newWordFr = dico[key]; //créé une variable avec le mot traduit
        document.getElementById("wordFr").innerHTML = newWordFr; //ajouter le mot fr sur la page HTML id wordFr
      }
    }

    //Récupérer le mot français en string
    wordFr = document.getElementById("wordFr").innerText;
    console.log(wordFr);

    //Phrase d'intro pour le mot français
    const lectureTrFr = new SpeechSynthesisUtterance("En français ca se dit");
    lectureTrFr.volume = 1;
    lectureTrFr.lang = 'fr-ca';;
    speechSynthesis.speak(lectureTrFr);

    //Retranscription du mot fr en parole avec accent fr
    const lectureFr = new SpeechSynthesisUtterance(wordFr);
    lectureFr.volume = 1;
    lectureFr.lang = 'fr-ca';;
    speechSynthesis.speak(lectureFr);

    //Phrase d'intro pour le mot anglais
    const lectureTrEn = new SpeechSynthesisUtterance("Et en anglais");
    lectureTrEn.volume = 1;
    lectureTrEn.lang = 'fr-ca';;
    speechSynthesis.speak(lectureTrEn);

    //Class qui permet de retranscrire du texte en parole
    const lectureEn = new SpeechSynthesisUtterance(wordEn);
    lectureEn.volume = 1;
    lectureEn.lang = 'en-en';
    speechSynthesis.speak(lectureEn);
  });
};

//dictionnaire des catégories du modèle et leurs traduction en-fr
const dico = {
  "person" : "personne",
  "bicycle" : "vélo",
  "car" : "voiture",
  "motorcycle" : "moto",
  "airplane" : "avion",
  "bus" : "bus",
  "train" : "former",	
  "truck" : "un camion",
  "boat" : "bateau",
  "traffic light" : "feu de circulation",
  "fire hydrant" : "bouche d'incendie",
  "stop sign" : "panneau stop",
  "parking meter" : "parcmètre",
  "bench" : "banc",
  "bird" : "oiseau",
  "cat" : "chat",
  "dog" : "chien",
  "horse" : "cheval",
  "sheep" : "mouton",
  "cow" : "vache",
  "elephant" : "éléphant",
  "bear" : "ours",
  "zebra" : "zèbre",
  "giraffe" : "girafe",
  "backpack" : "sac à dos",
  "umbrella" : "parapluie",
  "handbag" : "Sac à main",
  "tie" : "cravate",
  "suitcase" : "valise",
  "frisbee" : "frisbee",
  "skis" : "des skis",
  "snowboard" : "snowboard",
  "sportsball" : "balle de sport",
  "kite" : "cerf-volant",
  "baseballbat" : "batte de baseball",
  "baseballglove" : "gant de baseball",
  "skateboard" : "planche à roulette",
  "surfboard" : "planche de surf",
  "tennis racket" : "raquette de tennis",
  "bottle" : "bouteille",
  "wine glass" : "verre de vin",
  "cup" : "Coupe",
  "fork" : "fourchette",
  "knife" : "couteau",
  "spoon" : "cuillère",
  "bowl" : "bol",
  "banana" : "banane",
  "apple" : "Pomme",
  "sandwich" : "sandwich",
  "orange" : "orange",
  "broccoli" : "brocoli",
  "carrot" : "carotte",
  "hotdog" : "Hot-dog",
  "pizza" : "pizza",
  "donut" : "Donut",
  "cake" : "gâteau",
  "chair" : "chaise",
  "couch" : "canapé",
  "potted plant" : "plante en pot",
  "bed" : "lit",
  "dining table" : "table à manger",
  "toilet" : "toilette",
  "tv" : "la télé",
  "laptop" : "portable",
  "mouse" : "Souris",
  "remote" : "télécommande",
  "keyboard" : "clavier",
  "cell phone" : "téléphone portable",
  "microwave" : "four micro onde",
  "oven" : "four",
  "toaster" : "grille-pain",
  "sink" : "évier",
  "refrigerator" : "réfrigérateur",
  "book" : "livre",
  "clock" : "horloge",
  "vase" : "vase",
  "scissors" : "les ciseaux",
  "teddy bear" : "ours en peluche",
  "hairdrier" : "sèche cheveux",
  "toothbrush" : "brosse à dents",
};