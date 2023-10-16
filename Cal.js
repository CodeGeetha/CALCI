let hist='';
let openbrace=true;
let val = "";
let buttons = document.querySelectorAll('.button');

buttons.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        if(e.target.innerHTML === '='){
            try{
                val = eval(val);
                hist=hist+'='+val;
                document.querySelector('input').value = val;
            }
            catch(error){
                document.querySelector('input').value='ERROR';
            }
        }
        else if(e.target.innerHTML === 'C'){
            val = ""
            document.querySelector('input').value = val;
        }
        else if(e.target.innerHTML==='()'){
            if(openbrace===true){
                openbrace=false;
                val=val+'(';
                hist=val;
                document.querySelector('input').value = val;
            }
            else{
                openbrace=true;
                val=val+')';
                hist=val;
                document.querySelector('input').value = val;
            }
        }
        else{
            val = val+ e.target.innerHTML;
            hist=val;
            document.querySelector('input').value = val;
        }
    })
})

document.getElementById('backspace').addEventListener('click', () => {
    val=document.querySelector('input').value.substring(0,document.querySelector('input').value.length-1);
    document.querySelector('input').value=val;
});

document.getElementById('history').addEventListener('click',()=>{
    document.querySelector('input').value=hist;
});