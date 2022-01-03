prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90

});
 camera=document.getElementById("camera");
 Webcam.attach('#camera'); 

 function take_snapshot()
 {
     Webcam.snap(function(data_uri) {
         document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
 
     }); 
 }
 
 classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2loyJBBHG/model.json',modelLoaded);
 
 function modelLoaded() {
     console.log('Model Loaded!');
 
 }
 
 function check()
 {
     img = document.getElementById('captured_image');
     classifier.classify(img, gotResult);
 }
 
 function speak(){
     var synth=windows.speechSynthesis;
     speak_data_1="The First Prediction Is:"+ prediction_1;
     speak_data_2="The Second Prediction Is:"+ prediction_2;
     var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
     synth.speak(utterThis);
 }


function gotResult(error, results) {
    if (error) {
        console.error(error);

    } else {
        r = Math.floor(Math.random() * 255) + 1;
        g = Math.floor(Math.random() * 255) + 1;
        b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("result_emotion_name").innerHTML = results[0].label;

        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
         
        
        speak();
       
        

        if (results[0].label == "fist") {
            
            document.getElementById("update_emoji").innerHTML="&#128074;";
          
            
        } else if (results[0].label == "five") {
            document.getElementById("update_emoji").innerHTML="&#128400;";
           
        } else if (results[0].label == "A-Ok") {
           
            document.getElementById("update_emoji").innerHTML="&#128076;";
            
        } 
        if (results[1].label == "fist") {
            
            document.getElementById("update_emoji2").innerHTML="&#128074;";
          
            
        } else if (results[1].label == "five") {
            document.getElementById("update_emoji2").innerHTML="&#128400;";
           
        } else if (results[1].label == "A-Ok") {
           
            document.getElementById("update_emoji2").innerHTML="&#128076;";
            
        } 

    }

}