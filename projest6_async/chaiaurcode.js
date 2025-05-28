let randomColor=function(){
  const hex="0123456789ABCDEF";
  let color="#"
  for(let i=0;i<6;i++){
      color+=hex[Math.floor(Math.random()*16)];
  }
  return color;
}
let intervalId;

const start_change_color=function(){
  function changes(){
    document.body.style.backgroundColor=randomColor();
  }
  
  if(!intervalId){
    console.log("change changes start");
   intervalId=setInterval(changes,1000);
   
  }

}

const stop_change_color=function(){
  if(intervalId){
   clearInterval(intervalId);
   intervalId=null;
   console.log("color changes stop");
  }

}

document.querySelector('#start').addEventListener('click',start_change_color);
document.querySelector('#stop').addEventListener('click',stop_change_color);