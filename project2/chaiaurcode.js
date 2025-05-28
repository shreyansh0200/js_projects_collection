const form=document.querySelector('form');

//we need to deactivate extra events


form.addEventListener('submit',function(e){
  e.preventDefault();

  const height=parseInt(document.querySelector('#height').value);
  const weight=parseInt(document.querySelector('#weight').value);
  const results=document.querySelector("#results");

  if(height===''|| height<0||isNaN(height)){
    results.innerHTML=`please inter valid height ${height}`
  }else if(weight===''|| weight<0||isNaN(weight)){
    results.innerHTML=`please inter valid weight ${weight}`
  }else{
     const bmi=(weight/((height*height)/10000)).toFixed(2);
    //show that result.
    results.innerHTML=`<span>${bmi}<span>`;

    if(bmi<=18.6){
      results.innerHTML=`<span>${bmi}<span> and BMI concluded to be under_weight`;

    }
    if(bmi>18.6||bmi<=24.9){
      results.innerHTML=`<span>${bmi}<span> and BMI concluded to be normal-range`;

    }
    if(bmi>24.9){
      results.innerHTML=`<span>${bmi}<span> and BMI concluded to be Overweight`;

    }

  }

 


})