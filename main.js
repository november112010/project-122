x = 0;
y = 0;
screen_height = 0;
screen_width = 0;
apple = "";
speak_data = "";
to_number = "";

function preload()
{
  apple = loadImage("apple.png");  
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) 
{
 console.log(event); 
 content = event.results[0][0].transcript;
 to_number = Number(content);
 if(Number.isInteger(to_number))
 {
   document.getElementById("status").innerHTML = "Started drawing apple";
   apple = "set";
 }
 else
 {
    document.getElementById("status").innerHTML = "The speech has not recognized a number";
 }
 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

}

function setup() 
{
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width,screen_height-150);
  canvas.position(75);
}

function draw() {
  if(apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
  }

  for(var i = 1; i <= to_number; i++)
  {
    x = Math.floor(Math.random() * 700);
    y = Math.floor(Math.random() * 400);
    image(apple, x, y, 50, 50);  
  }
  document.getElementById("status").innerHTML = to_number + "Apples drawn";
  speak_data = to_number.concat("Apples drawn");
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}