const wrapper=document.querySelector(".wrapper");
const b1=document.querySelector("#b1");
const b2=document.querySelector("#b2");
const b3=document.querySelector("#b3");
const b4=document.querySelector("#b4");
const b5=document.querySelector("#b5");
const b6=document.querySelector("#b6");
const b7=document.querySelector("#b7");
const b8=document.querySelector("#b8");
const b9=document.querySelector("#b9");
const b10=document.querySelector("#b10");
const b11=document.querySelector("#b11");
const b12=document.querySelector("#b12");
const b13=document.querySelector("#b13");
const b14=document.querySelector("#b14");
const b15=document.querySelector("#b15");
const b16=document.querySelector("#b16");
const display=document.querySelector(".display");
const overLay=document.querySelector(".overLay");
const displayHigh=document.querySelector(".displayHigh");
//setting highscore
console.log(localStorage.getItem("highscore"));
if(localStorage.getItem("highscore")){
  displayHigh.innerText=localStorage.getItem("highscore");
}
var gameScore=0;
var X,Y;
var gameCount=0;
var stopGame;
function addTwo(){
  stopGame=setTimeout(()=>{
  play();
  },200);
}
window.addEventListener("keydown",(event)=>{
  var movement="";
  var flag=true;
  switch(event.key){
    case "ArrowLeft":
      movement="left";
      move(movement);
      break
    case "ArrowRight":
      movement="right";
      move(movement);
      break
    case "ArrowDown":
      movement="down";
      move(movement);
      break
    case "ArrowUp":
      movement="up";
      move(movement);
      break;
    default:
      flag=false;
      break;
  }
  // console.log(movement);
  if(flag)
    addTwo()
 
})
const hor=[[b1,b2,b3,b4],[b5,b6,b7,b8],[b9,b10,b11,b12],[b13,b14,b15,b16]];
const vert=[[b1,b5,b9,b13],[b2,b6,b10,b14],[b3,b7,b11,b15],[b4,b8,b12,b16]];

//checking condtion when all 16 blocks are filled
function checkedFull(){
  let flag=false;
  hor.forEach(sub => {
    // console.log("thank1");
    for(let i=0;i<=sub.length-2;i++){
      // console.log("ALPHA");
      if(sub[i].innerText==sub[i+1].innerText){
        // console.log("alpha");
        flag=true;
        break;
      }
    }
  });
  vert.forEach(sub=>{
    // console.log("thank2");
    for(let i=0;i<=sub.length-2;i++){
      // console.log("BETA");
      if(sub[i].innerText==sub[i+1].innerText){
        // console.log("beta");
        flag=true;
        break;
      }
    }
  })
  // console.log(flag);
  if(!flag)
  return false;
  else
  return true;
}
//adding new 2s
function play(){
do{
  X=Math.floor(Math.random()*(4-0)+0);
  Y=Math.floor(Math.random()*(4-0)+0);
}while(gameCount<=15&&hor[X][Y].innerText!="");
gameCount +=1;
console.log("*******",gameCount,"********************");
if(gameCount>16){
  z=checkedFull();
  console.log(z);
  if(z){
    console.log("stillChance");
    gameCount=16;
  }
  else{
    clearTimeout(stopGame);
    console.log("gameisStopped");
    overLay.style.display="flex";
    updateHighScore();
  }
}
else{
hor[X][Y].innerText="2";
hor[X][Y].classList.add("C2");
}
}

//fucntion to chagne color accoridng to number
function updateColor(){
  hor.forEach(sub => {
    sub.forEach(element => {
      element.classList="";
      element.classList.add("boxes");
      switch(element.innerText){
        case "2":
          element.classList.add("C2");
          break;
        case "4":
          element.classList.add("C4");
        break;
        case "8":
          element.classList.add("C8");
        break;
        case "16":
          element.classList.add("C16");
          break; 
        case "32":
          element.classList.add("C32");
        break;
        case "64":
          element.classList.add("C64");
          break;
        case "128":
          element.classList.add("C128");
          break;
        case "256":
          element.classList.add("C256");
          break;
        case "512":
            element.classList.add("C512");
          break;
        case "1024":
            element.classList.add("C1024");
          break;
        case "2048":
            element.classList.add("C2048");
          break;
      }
    });
  });
}

function updateBlocksReverse(element,tempArr){
  // console.log(tempArr);
   var z=tempArr.length-1;
   var tempTempArr=[];
   var flag=false;
    for(let i=z;i>0;i--){
      if(tempArr[i]==tempArr[i-1]){
        tempArr[i-1]=`${2*parseInt(tempArr[i])}`;
        gameScore +=(parseInt(tempArr[i-1]));
        display.innerText=gameScore;
        tempTempArr=[...tempArr.slice(0,i),...tempArr.slice(i+1)];
        gameCount -=1;
        flag=true;
        break;
        // tempArr.pop();
      }
    }
    if(flag)
      tempArr=[...tempTempArr];
    // console.log(tempArr);
    var count=0;
    element.forEach(x => {
      if(count<tempArr.length){
        x.innerText=tempArr[count];
      }
      else{
        x.innerText="";
      }
      count +=1;
    });
    updateColor();

}
function updateBlocksForward(element,tempArr){
  // console.log("before",tempArr);
   var z=tempArr.length-1;
   var tempTempArr=[];
   var flag=false;
    for(let i=z;i>0;i--){
      if(tempArr[i]==tempArr[i-1]){
        tempArr[i-1]=`${2*parseInt(tempArr[i])}`;
        gameScore +=(parseInt(tempArr[i-1]));
        display.innerText=gameScore;
        tempTempArr=[...tempArr.slice(0,i),...tempArr.slice(i+1)];
        gameCount -=1;
        flag=true;
        break;
        // tempArr.pop();
      }
    }
    if(flag)
      tempArr=[...tempTempArr];
    // console.log("after",tempArr);
    var count=0;
    // element.reverse();
    // element.forEach(x => {
    //   if(count<tempArr.length){
    //     x.innerText=tempArr[count];
    //   }
    //   else{
    //     x.innerText="";
    //   }
    //   count +=1;
    // });
    // element.reverse();
    for(var i=element.length-1;i>=0;i--){
      if(count<tempArr.length){
        element[i].innerText=tempArr[count];
      }
      else{
        element[i].innerText=""
      }
      count +=1;
    }
    updateColor();
}
function move(movement){
  if(movement==="left"){
      console.log("Left Movement");
      // console.log("hor",hor);
      hor.forEach(element => {
        // console.log("element",element);
        var tempArr=[];
        element.forEach(x => {
          if(x.innerText!=""){
            tempArr.push(x.innerText);
          }
        });
        if(tempArr.length!=0){
          updateBlocksReverse(element,tempArr);
        }
      });
  }
  else if(movement==="right"){
    console.log("Right Movement"); 
    // console.log("hor",hor);
      hor.forEach(element => {
        // console.log("element",element);
        var tempArr=[];
        element.forEach(x => {
          if(x.innerText!=""){
            tempArr.unshift(x.innerText);
          }
        });
        // console.log("@@@@@@@@",tempArr);
        if(tempArr.length!=0){
          updateBlocksForward(element,tempArr);
        }
      }); 
  }
  else if(movement==="up"){
    console.log("Top Movement"); 
    // console.log("vert",vert);
    vert.forEach(element => {
      // console.log("element",element);
      var tempArr=[];
      element.forEach(x => {
        if(x.innerText!=""){
          tempArr.push(x.innerText);
        }
      });
      if(tempArr.length!=0){
        updateBlocksReverse(element,tempArr);
      }
    }); 
  }
  else if(movement==="down"){
    console.log("Down Movement");
    // console.log("hor",vert);
      vert.forEach(element => {
        // console.log("element",element);
        var tempArr=[];
        element.forEach(x => {
          if(x.innerText!=""){
            tempArr.unshift(x.innerText);
          }
        });
        if(tempArr.length!=0){
          updateBlocksForward(element,tempArr);
        }
      }); 
  }

}
play();
function updateHighScore(){
    let z=localStorage.getItem("highscore");
    if(z<gameScore){
      localStorage.removeItem("highscore");
      localStorage.setItem("highscore",gameScore);
    }
}
//adding buttons controls
function upMovement(){
  move("up");
  addTwo()
}
function leftMovement(){
  move("left");
  addTwo()
}
function downMovement(){
  move("down");
  addTwo()
}
function rightMovement(){
  move("right");
  addTwo()
}