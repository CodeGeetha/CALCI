let openbrace=true;
let val = "";
let buttons = document.querySelectorAll('.button');
//for history
let hist=document.getElementById('hist');
let history_data=[];
let expression_data="";
let result_data="";
buttons.forEach((button)=>{
    button.addEventListener('click', (e)=> {
        if (e.target.innerHTML === '=') {
            try {
                if(val.slice(-1)==='*'){
                    val = eval(val.slice(0,-1));
                }else{
                val = eval(val);
                }
                result_data = val;
                history_data.push({"expression": expression_data, "result": result_data});
                historydata();
                result_data = "";
                expression_data = "";
                document.querySelector('input').value = val;
            } catch (error) {
                document.querySelector('input').value = 'ERROR';
            }
        } else if (e.target.innerHTML === 'C') {
            val = ""
            document.querySelector('input').value = val;
        } else if (e.target.innerHTML === '()') {
            if (openbrace === true) {
                openbrace = false;
                val = val + '(';
                expression_data = val;
                document.querySelector('input').value = val;
            } else {
                openbrace = true;
                val = val + ')';
                expression_data = val;
                document.querySelector('input').value = val;
            }
        } else if ((e.target.innerHTML === '+' || e.target.innerHTML === '-' || e.target.innerHTML === '*' || e.target.innerHTML === '/') && (val.slice(-1) === '+' || val.slice(-1) === '-' || val.slice(-1) === '*' || val.slice(-1) === '/')) {
            val = val.slice(0, -1) + e.target.innerHTML;
            document.querySelector('input').value = val;
        } else if (e.target.innerHTML === '%') {
            expression_data = document.querySelector('input').value = val + '%';


            // val=eval(val);
            // val=(parseFloat(val)/100).toString();
            // document.querySelector('input').value=val;

            if (val.includes('+') === false && val.includes('-') === false && val.includes('*') === false && val.includes('/') === false) {
                val = (parseFloat(val) / 100).toString()+'*';
                // document.querySelector('input').value = val;
            }
            else {
                for (let i = 1; i <= val.length; i++) {
                    if (val.slice(-i).includes('+') || val.slice(-i).includes('-') || val.slice(-i).includes('*') || val.slice(-i).includes('/')) {
                        temp = eval(val.slice(0, -i));
                        per = val.slice(-(i - 1));
                        if (val.slice(-i).includes('+')) {
                            tempper = (parseFloat(temp) + (parseFloat(per) / 100 * parseFloat(temp))).toString();
                        } else if (val.slice(-i).includes('-')) {
                            tempper = (parseFloat(temp) - (parseFloat(per) / 100 * parseFloat(temp))).toString();
                        } else if (val.slice(-i).includes('*')) {
                            tempper = (parseFloat(per) / 100 * parseFloat(temp)).toString();
                        } else if (val.slice(-i).includes('/')) {
                            tempper = (parseFloat(temp) / parseFloat(per) * 100).toString();
                        }

                        val= tempper+'*';
                        // document.querySelector('input').value = val;
                        break;
                    }
                }
            }
        }
        else{
            val = val+ e.target.innerHTML;
            expression_data=val;
            document.querySelector('input').value = val;
        }
    });
});
document.getElementById('backspace').addEventListener('click', () => {
    val=val.slice(0,-1);
    document.querySelector('input').value=val;
});


function historydata(){
    let str="";
    for(let key in history_data){
        str+= history_data[key]["expression"]+"="+history_data[key]["result"]+"<br>";
        hist.innerHTML=str;
    }
}
document.getElementById('history').addEventListener('click',()=>{
    let x=document.getElementById('hist');
    if(x.style.display==='none'){
        x.style.display='block';
    }
    else {
        x.style.display='none';
    }
})