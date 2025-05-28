const button =document.querySelectorAll('.button');
const body=document.querySelector("body");

button.forEach(function(button){
  console.log(button);
  button.addEventListener('click',function(e){
    if(e.target.id==="grey"){
      body.style.backgroundColor='rgb(196, 196, 196)'; 
    }
    
    if(e.target.id==="white"){
      body.style.backgroundColor=e.target.id; 
    }
    
    if(e.target.id==="x"){
      body.style.backgroundColor='rgb(125, 217, 230)'; 
    }
    
    if(e.target.id==="wheat"){
      body.style.backgroundColor=e.target.id; 
    }
    
    if(e.target.id==="pink"){
      body.style.backgroundColor=e.target.id; 
    }
    
  })
})