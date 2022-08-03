
                                            // START FROM HERE
 document.onload
{    
      
            const Score=document.querySelector('.score');//score div
        const startscreen=document.querySelector('.startscreen');//start button screen
        const GameArea=document.querySelector('.gamearea');//game area also gameplay
        // endscreen for the last diplay score and again start the game
        let endscreen=document.createElement('div');
        endscreen.style.display="none";
        
        
        
        //testing
        // console.log(Score);
        // console.log(startscreen);
        // console.log(GameArea);
        
        //player object for movement speed and score
        let player=
        {
            speed:4,
            score:0
        };
        //keys object to determine the which key key is press
        let keys=
        {
            ArrowUp:false,
            ArrowDown:false,
            ArrowLeft:false,
            ArrowRight:false
        };
        //detect the when key release 
        function keyUp(e)
        {
            e.preventDefault();
            
            keys[e.key]=false;
    // console.log(keys);
    
}
// detect when key press
function keyDown(e)
{
    e.preventDefault();
    keys[e.key]=true;
    // console.log(keys);
}
startscreen.addEventListener('click',start);//when press start it move to start funtion
document.addEventListener('keyup',keyUp );//when key release
endscreen.addEventListener('click',againstart);//when collisoin detect and end screen show
document.addEventListener('keydown',keyDown );//when key down
function againstart()//function which restart the game at same point
{
    start();
    
}
function restat()//exit button reload the document to start
{
    
    window.location.reload();
    
}
//!--main start function
function start()
{   player.start=true;
    GameArea.classList.remove('hide');//!-- use this to display game area
    GameArea.innerHTML="";// !-- use to clear the data and again make ,use for replay the game 
    endscreen.innerHTML="";
    player.score=0;
    let exit=document.createElement('button'); // !-- create wxit button
    exit.setAttribute('class','exit');
    exit.innerHTML="Exit";
    document.querySelector('.cargame').appendChild(exit);
    exit.addEventListener('click',restat); // !-- event listner for exit button
    window.requestAnimationFrame(gameplay);
    // !-- Create the road line below
    for (let index = 0; index < 6; index++) {
        let roadline=document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=index*150;    
        roadline.style.top=roadline.y+"px";
        GameArea.appendChild(roadline);
        
    }
    let car= document.createElement("div"); //create the car of player
    car.setAttribute("id","car");
    // car.innerHTML="Hello i am car";
    GameArea.appendChild(car);
    player.x=30;
    player.y=530;
    
    for (let index = 0; index < 6;  index++) {  //!-- Create the enemy cars
        let enemycar=document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y=((index+1)*300)*-1;    // !-- use for start making car with this gap
        enemycar.style.top=enemycar.y+"px";
        enemycar.style.left=Math.floor(Math.random()*450)+"px"; // !-- width of game area to produce random car b/w area
        GameArea.appendChild(enemycar);
        
    }
    
}
// !-- When collision detected the endscreen function call
function Endgame()
{
    player.start=false;
    
    endscreen.setAttribute('class','endscreen');// !-- create the end screen styling
    let p=document.createElement('p'); //!-- create paragrapgh for display
    p.setAttribute('class','endnote');
    p.innerText=`Your score is : ${(player.score+1)} \n Press Here to Restart ! `;
    endscreen.style.display="block";
    
    endscreen.appendChild(p) ;   
    GameArea.appendChild(endscreen);

    // console.log(endscreen);

    
}
function Movecar(car) //!-- function which is enable to move car
{
    let enemy =document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        
        if(!(iscollide(car,item))) // !-- check if the collision detected or not
        {
            console.log("hit the car");
            Endgame();
            
        }
        if(item.y >=750)
        {
            item.y = -400;
            item.style.left=Math.floor(Math.random()*400)+"px"; // create car at random positon
        }
        item.y +=player.speed;
        item.style.top=item.y+"px";
    });
}
function iscollide(me,enemy)
{   //!-- check the collison
    let a=me.getBoundingClientRect();
    let b=enemy.getBoundingClientRect();
    return ((a.bottom < b.top)||(a.top > b.bottom)||(a.right < b.left)||(a.left > b.right))
}
function Movelines()
{ //!-- move lines of center road
    let lines =document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >=700)
        {
            item.y -=750;
        }
        item.y +=player.speed;
        item.style.top=item.y+"px";
    })
}
function gameplay() // !- - Main gameplay 
{
    
    
    // GameArea.classList.remove('hide');
    // startscreen.classList.add('hide');
    // console.log("hey i am clicked !");
    
    let car=document.getElementById("car");
    let road=GameArea.getBoundingClientRect();// !-- get the road position
    // console.log(road);
    if(player.start)
    {
        Movelines();
        Movecar(car);
        if(keys.ArrowUp && player.y > (road.top +60 )){player.y -=player.speed}
        if(keys.ArrowDown &&player.y <(road.bottom -106 )){player.y +=player.speed}
        if(keys.ArrowLeft && player.x>4){player.x -=player.speed}
        if(keys.ArrowRight && player.x<450){player.x +=player.speed}
        car.style.top=player.y + "px";
        car.style.left=player.x + "px";
        window.requestAnimationFrame(gameplay); // Animation loop also recurion
        console.log(player.score++);
        Score.innerHTML=" Score  <br> "+ player.score++; //! -- displaying the score
    }
}
}

                                                    // !-- THE END

