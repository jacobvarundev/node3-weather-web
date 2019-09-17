console.log('client side js');



const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    messageOne.textContent='Data loading';
    const location=search.value;
   
        
    fetch(`/weather?address=${location}`).then((res)=>
    {    
        res.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent='error';
            }else{
            console.log(data);
            messageOne.textContent=`${data.location}.\n${data.summary}`
            }
        })
    }
    );

    
})