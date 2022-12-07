let prediction1 = "";
let prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 180
})

const cameraEl = document.querySelector("#camera");

const takeScreenShot = () =>{
    Webcam.snap(dataURL =>{
        document.querySelector("#result").innerHTML = `<img src=${dataURL} id=""capturedImage />`    
    })
}

console.log(ml5.version);

const classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', console.log("Modal Loaded!"));

const speak = () =>{
    const sync = speechSynthesis;
    const dataSpeak1 = `The first prediction is: ${prediction1}`;
    const dataSpeak2 = `The second prediction is: ${prediction2}`;
    const speakData = new SpeechSynthesisUtterance(dataSpeak1 + dataSpeak2);
   sync.speak(speakData);
}

const checkImage = () =>{
    const img = document.querySelector('#capturedImage');
    classifier.classify(img, gotResult);
}

const gotResult = (error, result) =>{
    if(error){
        
    }else{
        document.querySelector("#result_emotion_name").innerHTML = result[0].label;
        document.querySelector("#result_emotion_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        if(result[0].label = "happy"){
            document.querySelector("update-emoji").innerHTML = "&#128522;";
        }else if(result[0].label = "sad"){
            document.querySelector("update-emoji").innerHTML = "&#128532;";
        }else if(result[0].label = "angry"){
            document.querySelector("update-emoji").innerHTML = "&#128548;";
        }
        if(result[1].label = "happy"){
            document.querySelector("update-emoji2").innerHTML = "&#128522;";
        }else if(result[1].label = "sad"){
            document.querySelector("update-emoji2").innerHTML = "&#128532;";
        }else if(result[1].label = "angry"){
            document.querySelector("update-emoji2").innerHTML = "&#128548;";
        }
    }
}