previous_result = "";


function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet" , modelready);
}

function draw()
{
  image(video, 0,0,300,300);
  classifier.classify(video, got_results);
}

function modelready()
{
  console.log("yay it worked");
}

function got_results(error, results)
{
  if(error)
  {
    console.log(error);
  }

  else
  {
    if(previous_result != results[0].label && results[0].confidence > 0.5)
    {
      console.log(results);
    document.getElementById("label").innerHTML = results[0].label;
    document.getElementById("confidence").innerHTML = results[0].confidence.toFixed(4);
    previous_result = results[0].label;

      var synth = window.speechSynthesis;
      speak_data = "this is a -"+results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
    }
  }
}