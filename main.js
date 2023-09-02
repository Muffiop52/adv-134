img = "";
object = [];
states = "";
function preload()
{
          img = loadImage('dog_cat.jpg');
}

function setup()
{
          canvas = createCanvas(380,380);
          canvas.center();
          video = createCapture(VIDEO);
          video.size(380,380);
          video.hide();
}

function start()
{
          objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
          document.getElementById("states").innerHTML = "Status : Detecting Object";
}

function draw()
{
          image(video,0,0,380,380);
          
          if(states != "")
          {
                    r = random(255);
                    g = random(255);
                    b = random(255);
                    
                    objectDetector.detect(video ,gotResults);
                    for(i=0; i < object.length; i++)
                    {
                             
                              document.getElementById("states").innerHTML = "Status: Object IS Detected";
                              document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are:" + object.length;
                              fill(r,g,b);
                              percent = floor(object[i].confidence * 100);
                              text(object[i].label + "" + percent + "%", object[i].x ,object[i].y);
                              noFill();
                              stroke(r,g,b);
                              rect(object[i].x , object[i].y ,object[i].height , object[i].width);
                    }
          }
}

function modelLoaded()
{
          console.log("ModelLoaded!");
          states = true;
}

function gotResults(error , results)
{
          if(error)
          {
                    console.log(error);
          }
          else
          {
                    console.log(results);
                    object = results
          }
          
}

