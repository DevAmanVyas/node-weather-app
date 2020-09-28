console.log('Index js is up')




const wForm = document.querySelector('form');
const msg = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
const search = document.querySelector('input');

wForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    msg.textContent = '';
    msg2.textContent = '';
    msg.style.color ='black';
    const location = search.value;
    msg.textContent = 'Loading... Please wait!'
    console.log(location)
    if(location){
        fetch('/weather?address='+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    msg.style.color ='red';
                    msg.textContent = data.error;
                }else{
                    msg.textContent = data.location;
                    msg2.textContent = data.forecast;
                  
                }
            });
        });
    } else {
        msg.style.color ='red';
        msg.textContent = 'Please provide location!';
    }
    
});