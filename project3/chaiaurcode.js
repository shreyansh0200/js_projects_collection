const clock =document.getElementById('clock');
// document.querySelector('#clock');

setInterval(function(){
  let date=new Date();// store the date .
  // clock.innerHTML=date.toLocaleTimeString();
  clock.innerHTML=date.toLocaleTimeString();// gives the type of date.
},1000);
