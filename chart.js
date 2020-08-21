window.onload = function(){

    async function chart(){
       let res = await fetch('https://api.covid19india.org/data.json'); 
       let data = await res.json(); 
       console.log(data);

    }
    
    let states = [];
    let confirmed = [];
    let recovered = [];
    let deaths = [];
}