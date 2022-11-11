//Frigo fonctionnel 2 ______________________________________________________

let wordEn;
let wordFr;

 // Création d'une image
let img_to_detec = document.createElement('img');


 // Ici qu'on lance  la detection automatique lorsque l'image est droper dans le cadre 
 img_to_detec.addEventListener('load', () => {
    console.log('okok: ', img_to_detec);
    detector = ml5.objectDetector('cocossd');
    // detectObjAffichage(img_to_detec)
 })

 // Fonction pour écouter le drop d'image
 function handleDrop(){
    const image_drop_area = document.querySelector("#image_drop_area");
    const detecte_obj_btn = document.getElementById('detect_obj')
    
    detecte_obj_btn.addEventListener('click', ()=>{
      detectObjAffichage(img_to_detec) //detectObj
    })

    image_drop_area.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });
 
    function ImageReader(file){
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
            
          uploaded_image = event.target.result; 
          
          document.querySelector("#image_drop_area").style.backgroundImage = `url(${uploaded_image})`;
          img_to_detec.src = uploaded_image
    
      });
      reader.readAsDataURL(file);
    }
 
    image_drop_area.addEventListener('drop', (event) => {
      event.stopPropagation();
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      // document.querySelector("#file_name").textContent = fileList[0].name;
      ImageReader(fileList[0]);
      // detectObj(img_to_detec)
    });
  }

function detectObjAffichage(image){
  // detector = ml5.objectDetector('cocossd');
  detector.detect(image,function(error, result){
    if(error) {
      console.error(error);
      return;
    }
    //console.log(result);
    wordEn = result[0].label;
    let confidence = result[0].confidence;

    for(let key in dico){
      if (key == wordEn){ //si la clé est égale au mot à traduire
        wordFr = dico[key]; //créé une variable avec le mot traduit
        document.querySelector("#obj_detect").textContent = wordFr; //ajouter le mot fr sur la page HTML
      }
    }

    document.querySelector("#obj_confidence").textContent = 100 * confidence.toFixed(2) + " %";    //confidence.toFixed(2)
  });
  
  let elementsButton = document.getElementsByTagName("button"); 
    let buttonTr = elementsButton[6]; //Bouton TRADUCTION
  
    buttonTr.addEventListener('click', () => {
      document.getElementById("wordEn").innerHTML = wordEn;
      console.log(wordEn);

      //Créer une variable qui récupère le mot en anglais pour futur traduction en français
      wordToTrad = document.getElementById("wordEn").innerText;

      //boucle dans le dictionnaire "dico" pour retrouver le mot à traduire en-fr
      for(let key in dico){
          if (key == wordToTrad){ //si la clé est égale au mot à traduire
            let newWordFr = dico[key]; //créé une variable avec le mot traduit
            document.getElementById("wordFr").innerHTML = newWordFr; //ajouter le mot fr sur la page HTML
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

document.addEventListener('DOMContentLoaded', () => {
    handleDrop()
})

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