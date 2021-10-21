
// var dataseting = document.querySelector("#divtemp");
// var str="";
// for(var i=0;i<nameofperson.length;i++)
//    str+=nameofperson[i];

// dataseting.textContent=str;
var doctor=document.querySelector("#docname");
var patient=document.querySelector("#patient");
var ageform=document.querySelector("#age");
var prescription=document.querySelector("#prescription");
var adviceform=document.querySelector("#advice");
var symptomsform=document.querySelector("#symptoms");

var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
// date.textContent =utc;

 var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
 var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

 var grammar = '#JSGF V1.0;grammar prescriptions; '

 var recognition = new SpeechRecognition();
 var speechRecognitionList = new SpeechGrammarList();
 speechRecognitionList.addFromString(grammar, 1);
 recognition.grammars = speechRecognitionList;
 recognition.lang = 'en-US';
 recognition.interimResults = false;
 recognition.onresult = function (event) {
     var last = event.results.length - 1;
     //console.log(event.results[0][0].transcript);
     var command = event.results[last][0].transcript;
    //  message.textContent = 'Voice Input: ' + command + '.';
    
    var commandtest = command.toLowerCase();
    commandtest=commandtest.split(' ');
    console.log(commandtest); 
    var dname="",name="",age="",symptoms="",prescribe="",advice="";   
    if (commandtest[0]=='doctor' ||commandtest[0]=='dr'||commandtest[0]=='dr.'){
        
        for(let i=1;i<commandtest.length;i++)
            dname+=commandtest[i]+" ";
        doctor.value=dname;
        
    }
    else if (commandtest[0]=='patient'){
        
        for(let i=1;i<commandtest.length;i++)
            name+=commandtest[i]+" ";
        patient.value=name;
        
    }
    else if (commandtest[0]=='age'){
        
        for(let i=1;i<commandtest.length;i++)
            age+=commandtest[i];
        ageform.value=age;
        
    }
    else if (commandtest[0]=='symptoms' ||commandtest[0]=='symptom'){
        
        for(let i=1;i<commandtest.length;i++)
            symptoms+=commandtest[i]+" ,";
        symptomsform.value+=symptoms+" ";

        
        
        

        
    }
    else if (commandtest[0]=='prescription'){
        
        for(let i=1;i<commandtest.length;i++)
            prescribe+=commandtest[i]+" ,";
        prescription.value+=prescribe+" ";
        
        

        
    }
    else if (commandtest[0]=='advice' ||commandtest[0]=='advise'){
        
        for(let i=1;i<commandtest.length;i++)
            advice+=commandtest[i]+" ";
        adviceform.value+=advice+", ";
    }
    
 };

recognition.onspeechend = function () {
        recognition.stop();
    };

recognition.onerror = function (event) {
        console.log('Error occurred in recognition: ' + event.error);
    }

document.querySelector('#buttontospeak').addEventListener('click', function () {
        recognition.start();

    });






