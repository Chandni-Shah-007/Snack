//cavas part
const canvas = document.querySelector('canvas');
canvas.width=608;
canvas.height=608;

const c = canvas.getContext('2d');


//score

let score = 0,snake,food,highScore=0,game;
let box= 32;    //create unit



//load images
let foodImg = new Image();
let ground = new Image();

foodImg.scr='food.png';
ground.src='image/ground.png';

//load audios
let up = new Audio();
let down = new Audio();
let left = new Audio();
let right = new Audio();
let eat = new Audio();
let dead = new Audio();

up.src='audio/up.mp3';
down.src='audio/down.mp3';
left.src='audio/left.mp3';
right.src='audio/right.mp3';
eat.src='audio/eat.mp3';
dead.src='audio/dead.mp3';

ground.onload = function()
{

    c.drawImage(ground, 0,0);

    c.fillStyle="white"
        c.font="40px calibri";
        c.fillText(score, 2*box, 1.6*box);

        c.font="30px calibri";
        c.fillText("Hightest Score: " + highScore,12*box,1.4*box);
}


//control snake
document.addEventListener('keydown', direction);
let dir;


function startGame() {
    clearInterval(game)
    
    highScore = Math.max(score, highScore);
    score=0;
 //snack
 snack =[];
snack[0] = {
    x:9*box,
    y:10*box
};

//create food
 food ={
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box    
};
dir='';
 game = setInterval(draw,100);  //call draw function 100 ms

 
}


function draw(){
    

    for(let i=0; i<snack.length; i++)
    {
        c.fillStyle = (i==0) ? "green" : "white"
        c.fillRect(snack[i].x, snack[i].y, box,box)

        c.strokeStyle = "red";
        c.strokeRect(snack[i].x, snack[i].y, box,box)
    }
    c.drawImage(foodImg, food.x, food.y);

    //old head postion
    
    let snakeX = snack[0].x;
    let snakey = snack[0].y;

    //which direction

    if(dir=='left')
    {
        snakeX-=box;
    }
    else if(dir=='up')
    {
        snakey-=box;
    }
    else if(dir=='right')
    {
        snakeX+=box;
    }
    else if(dir=='down')
    {
        snakey+=box;
    }

    //if snake eats food
    if(snakeX==food.x && snakey==food.y)
    {
        //we don't move the tail here
        score++
        eat.play();
        food = {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        }
    }
    {
        //remove the tail here 
        snack.pop();
    }
    
        //add new head
        let newHead={
            x:snakeX,
            y:snakey
        }
        //Game over
        if(snakeX<box || snakeX>17*box || snakey<3*box || snakey>17*box || collision(newHead,snack))
        {
             dead.play();
             clearInterval(game);
             c.fillStyle="green";
             c.fillRect(5*box, 8*box, 9*box,3*box)
             
             c.fillStyle="white";
             c.font='40px calibri';
             c.fillText("Your Score: " + score, 6*box, 10*box);
        }

        snack.unshift(newHead);
    
        c.fillStyle="white"
        c.font="40px calibri";
        c.fillText(score, 2*box, 1.6*box);

        c.font="30px calibri";
        c.fillText("Hightest Score: " + highScore,12*box,1.4*box);
       
}


function direction(event){
    if (event.keyCode==37  && dir!='right' ){
        left.play();
        dir='left';
    }
    else  if (event.keyCode==38 && dir!='down'){
        up.play();
        dir='up';
    }
    else  if (event.keyCode==39 && dir!='left'){
      right.play();
        dir='right';
    }
    else  if (event.keyCode==40 && dir!='up'){
        down.play();
        dir='down';
    }
}

function collision(newHead,snack){
    for(let i = 0; i<snack.length; i++){
        if(newHead.x==snack[i].x && newHead.y==snack[i].y){
            return true;
        }
    }
    return false
}