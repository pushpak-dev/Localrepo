

  let board= document.querySelector(".board");
  let modal=document.querySelector(".modal");
  let stratGame=document.querySelector(".start-game");
  let startGameBtn=document.querySelector(".btn-start");
  let gameOver=document.querySelector(".game-over");
  let restartBtn=document.querySelector(".btn-restart");
  let highScoreElem= document.querySelector("#high-score");
  let scoreElem=document.querySelector("#score");
  let timeElem=document.querySelector("#time");
  



  let blockHeigth=50;
  let blockWidth=50;
  let blocks=[];
  let snake=[{
         x:4,
         y:11,
  }]
  let direction="left";
  let interval=null;
 let cols= Math.floor(board.clientWidth/blockWidth);
 let rows= Math.floor(board.clientHeight/blockHeigth);
 let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
 let score=0;
 let highScore=0;
 let time=`00:00`;
 let timerInterval=null;
 

 for(let row=0; row<rows; row++){
    for(let col=0; col<cols; col++){
        let block=document.createElement("div");
        block.classList.add("blocks");
        board.appendChild(block);
        block.innerText=`${row}-${col}`;
        blocks[`${row}-${col}`]=block;
    }
 }
 let render=()=>{

       let head=null;
      blocks[`${food.x}-${food.y}`].classList.add("food");

       if(direction==="left"){
      head={x:snake[0].x, y:snake[0].y-1};
       }else if(direction==="right"){
      head={x:snake[0].x, y:snake[0].y+1};
       }else if(direction==="down"){
      head={x:snake[0].x+1, y:snake[0].y};
       }else if(direction==="up"){
      head={x:snake[0].x-1, y:snake[0].y};
       }


       if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
            clearInterval(interval);
      blocks[`${food.x}-${food.y}`].classList.remove("food");
         snake.forEach((obj)=>{
        blocks[`${obj.x}-${obj.y}`].classList.remove("fill");
          })
            restartGame();
            return;
       }



        snake.forEach((obj)=>{
        blocks[`${obj.x}-${obj.y}`].classList.remove("fill");
    })

    if(head.x===food.x && head.y===food.y){
         blocks[`${food.x}-${food.y}`].classList.remove("food")
         food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
        snake.push(food);
         blocks[`${food.x}-${food.y}`].classList.add("food")
         score +=10;
         scoreElem.innerHTML=score;
    }


  snake.unshift(head);
  snake.pop();
    

    snake.forEach((obj)=>{
        blocks[`${obj.x}-${obj.y}`].classList.add("fill");
    })
 }
startGameBtn.addEventListener("click",()=>{
    highScore=+localStorage.getItem("highScore");
    highScoreElem.innerHTML=highScore;
    modal.style.display="none";
    interval=setInterval(()=>{
    render();
    },300)
   
   timerInterval=setInterval(()=>{
 let [min,sec]=time.split(":").map(Number);
     
 if(sec==59){
    min+=1;
    sec=0;
 }else{
    sec+=1;
 }
 time=`${min}:${sec}`;
 timeElem.innerHTML=time;
   },1000)
})
let restartGame=()=>{
    modal.style.display="flex";
    stratGame.style.display="none";
    gameOver.style.display="flex";
    clearInterval(timerInterval);
  
      if(score>highScore){
        highScore=score;
        localStorage.setItem("highScore",highScore.toString());
        score=0;
        scoreElem.innerHTML=score;
     }


}

restartBtn.addEventListener("click",()=>{
    highScore=+localStorage.getItem("highScore");
    highScoreElem.innerHTML=highScore;
       
      time=`00:00`;
    timeElem.innerHTML=time;
   
       timerInterval=setInterval(()=>{
 let [min,sec]=time.split(":").map(Number);
     
 if(sec==59){
    min+=1;
    sec=0;
 }else{
    sec+=1;
 }
 time=`${min}:${sec}`;
 timeElem.innerHTML=time;
   },1000)


      
        modal.style.display="none";
      blocks[`${food.x}-${food.y}`].classList.remove("food");
        food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
    snake=[{
        x:2,y:6
      }]
    snake.forEach((obj)=>{
        blocks[`${obj.x}-${obj.y}`].classList.add("fill");
         })
    direction="down";
    clearInterval(interval);
    interval=setInterval(()=>{
        render();
    },300);
})
addEventListener("keydown",(evt)=>{
       if(evt.key==="ArrowUp"){
        direction="up";
       }else if(evt.key==="ArrowDown"){
        direction="down";
       }else if(evt.key==="ArrowLeft"){
        direction="left";
       }else if(evt.key==="ArrowRight"){
        direction="right";
       }
});