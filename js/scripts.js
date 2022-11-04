// *****************************************************
// Drag & Drop
// *****************************************************

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
let imgTag;
let detector;

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}
input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});
function showFile(){
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if(validExtensions.includes(fileType)){ //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      imgTag = `<img src="${fileURL}">`; //creating an img tag and passing user selected file source inside src attribute
      
      console.log(imgTag);
       
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

// *****************************************************
// Détection d'objet
// *****************************************************

// //Code dernière version fonctionnelle
//let img;


//Charger le modèle
function preload() {
    img = loadImage(imgTag);
    detector = ml5.objectDetector('cocossd');
}

//Appel la méthode detect
function setup() {

    let myCanvas = createCanvas(640, 420);
    myCanvas.parent("myCanvas");
    createCanvas(640, 420);
    image(file, 0, 0);
    //detector = ml5.objectDetector('cocossd');
    
     //création du bouton qui va lancer la détection
     elementsButton = document.getElementsByTagName("button");
     let buttonStartDetection = elementsButton[2];
 
     buttonStartDetection.addEventListener('click', () => {
      detector.detect(imgTag, gotDetections);
     })
}

let detections = [];
//Capturer le résultat
function gotDetections(error, results) {
    if (error) {
        console.error(error);
    }

    detections = results;
    console.log(results);

    //Encadrer l'objet détecter
    for (let i = 0; i < results.length; i++) {
        let object = results[i];
        stroke(0, 204, 0);
        strokeWeight(2);
        noFill();
        rect(object.x, object.y, object.width, object.height)
        //Ajouter le nom de l'objet (label) à l'encadrer
        fill(0, 204, 0); //Couleur de fond de la police
        textSize(20); //Taille de la police
        text(object.label, object.x + 10, object.y + 40); //Disposition du texte
        text((int(object.confidence*100)+'%'), object.x + 10, object.y + 20); //Disposition du % de confidence
    }

    //Traduire du texte en parole avec un bouton pour l'activer
    //let hasEnabledVoice = true; // Activation de la voix 
    
    let elementsButton = document.getElementsByTagName("button"); 
    let buttonTr = elementsButton[3];
    buttonTr.addEventListener('click', () => {

        //Mettre le résultat (objet) dans un tableau sous la forme clé-valeur
        let resultats = Object.entries(results);

        //Récupérer le label du 1er objet (avec le % le plus élévé)
        let wordEn = [];
        wordEn = resultats[0][1].label;

        //Inscire le mot en anglais sur la page HTML
        document.getElementById("wordEn").innerHTML = wordEn;

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

        //Phrase d'intro pour le mot français
        const lectureTrFr = new SpeechSynthesisUtterance("En français ca se dit");
        lectureTrFr.volume = 1;
        lectureTrFr.lang = 'fr-ca';;
        speechSynthesis.speak(lectureTrFr);
        //hasEnabledVoice = false;

        //Retranscription du mot fr en parole avec accent fr
        const lectureFr = new SpeechSynthesisUtterance(wordFr);
        lectureFr.volume = 1;
        lectureFr.lang = 'fr-ca';;
        speechSynthesis.speak(lectureFr);
        //hasEnabledVoice = false;

        //Phrase d'intro pour le mot anglais
        const lectureTrEn = new SpeechSynthesisUtterance("Et en anglais");
        lectureTrEn.volume = 1;
        lectureTrEn.lang = 'fr-ca';;
        speechSynthesis.speak(lectureTrEn);
        //hasEnabledVoice = false;

        //Class qui permet de retranscrire du texte en parole
        const lectureEn = new SpeechSynthesisUtterance(wordEn);
        lectureEn.volume = 1;
        lectureEn.lang = 'en-en';
        speechSynthesis.speak(lectureEn);
        //hasEnabledVoice = false;
    });
};

//dictionnaire des catégories du modèle et leurs traduction en-fr
const dico = {
  "person" : "une personne",
  "bicycle" : "un vélo",
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
}