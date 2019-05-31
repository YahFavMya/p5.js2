// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBCXAJU0BQyfkbNI5GnshigWmaTG2-ZhBY",
  authDomain: "mya-s-amazing-project.firebaseapp.com",
  databaseURL: "https://mya-s-amazing-project.firebaseio.com",
  projectId: "mya-s-amazing-project",
  storageBucket: "mya-s-amazing-project.appspot.com",
  messagingSenderId: "1045353159663",
  appId: "1:1045353159663:web:b8af393fecca3393"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()

let scoreboard = { }
let yourname = document.getElementById("yourname")
let time
let speed
let size
let level
let score 
let direction
let direction_h
let direction_v
let direction_h2
let direction_v2

let x
let y
let m
let b
let h
let w

function setup() {
  createCanvas(windowWidth, windowHeight);
  //alert(width)
   s = width/1282
  time = 60
  speed = 8
  size = 100
  level=1
  score = 0
  direction_h = [1,1,1,1]
  direction_v = [1,1,1,1]
  direction_h2 = 1
  direction_v2 = 1
  
  x=(200)
  y=(500)
  m=[100,400,700,300]
  b=[300,600,100,300]
  h=(200)
  w=(300)

}

function draw() {
  
  time = time-0.04
  
  if (score > 100 && level == 1) {
      size = size - 30
    speed = speed + 5
    m = [1,1,1,1] 
    level = 2
  }
  if (score > 200 && level == 2) {
      size = size - 50
    speed = speed + 5
    m = [1,1,1,1] 
    level = 3
  }
  if (score > 300 && level == 3) {
      size = size + 30
    speed = speed + 8
    m = [1,1,1,1] 
    level = 4
  }
  if (score > 400 && level == 4) {
      size = size + 60
    speed = speed + 4
    m = [1,1,1,1] 
    level = 5
  }
  
  if (score > 500 && level == 5) {
      size = size + 80
    speed = speed + 4
    m = [1,1,1,1] 
    level = 6
  }
  
  if (score > 600 && level == 6) {
      size = size + 100
    speed = speed + 4
    m = [1,1,1,1] 
    level = 7
  }
  if (time > 0) {
  
  background(214, 234, 248)
  for (i=0; i<2; i=i+1) {

      if (dist(x*s,y*s,m[i]*s,b[i]*s) < 100 + size*s) {
        score = score - 2
      }
      fill(202,207,210)
      circle(m[i]*s,b[i]*s,size*s)

      if (m[i]*s > width || m[i]*s < 0) {
        direction_h[i] = direction_h[i] * -1
      }
      if (b[i]*s > height || b[i]*s < 0) {
        direction_v[i] = direction_v[i] * -1
      }
      m[i] = m[i] + 5*direction_h[i]
      b[i] = b[i] + 5*direction_v[i]
  }
  
  if (dist(x,y,h,w) < 100*s + 100) {
	score = score + 1
}
  
  if (h > width || h < 0) {
	direction_h2 = direction_h2 * -1
}
    if (w > height || w < 0) {
    direction_v2 = direction_v2 * -1
  }
  
  if (keyIsDown(RIGHT_ARROW) && x < width) {
    x = x + 8
  }
  if (keyIsDown(LEFT_ARROW) && x > 0) {
    x = x - 8
  }
  if (keyIsDown(UP_ARROW) && y > 0) {
    y = y - 8
  }
  if (keyIsDown(DOWN_ARROW) && y < height) {
    y = y + 8
  }
  
  textSize(30)
  text("Score: " +score,20,25)
  text("Time: " +time.toFixed(1),20,55)
  text(level,470,40)
  
  
  h = h + 7*direction_h2
  w = w + 7*direction_v2
  
  fill(213,245,227)
  circle(x,y,100)
  

  fill(244,143,177)
  circle(h,w,100)
  }
  else {
    yourname.innerHTML = "Name?<input id=bottle><button onclick='restart()'>Restart</button>"
	  <button onclick=generate_alltime_leaderboard()></button>
    noLoop()
    }
  }
function restart () {
  let bottle = document.getElementById("bottle")
  name = bottle.value
	database.ref(name).set(score)
  if (name != "") {
    scoreboard[name] = score
  }
  "Scoreboard: " +
  alert(JSON.stringify(scoSreboard,null,1))
  time = 60
  score = 0
  size = 100
  level=1
  score = 0
  
  loop()
  yourname.innerHTML = ""
  generate_leaderboard()
}
  function generate_leaderboard() {
    scores = Object.values(scoreboard)
    names = Object.keys(scoreboard)

    if (scores.length >=3) {
      let leaderboard = { }
      for (i=0; i < 3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
}
  }
  function generate_alltime_leaderboard() {
  	let alltime_leaderboard = { }
  	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
  		snapshot.forEach(function(data) {
  		alltime_leaderboard[data.key] = data.val()
  		});
      	});
  	if (Object.values(alltime_leaderboard).length > 0) {
  	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
      	}
  }

  generate_alltime_leaderboard()
  