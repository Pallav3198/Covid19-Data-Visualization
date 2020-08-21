window.onload = function(){

    init();
    refresh(); 
    chartData();
    createChart();
}
async function init(){
 let res = await fetch('https://api.covid19india.org/data.json');
 let data = await res.json();
 let obj = data.statewise[0];
 let output = 
 `<td><b>${obj.confirmed}</b></td>
 <td><b>${obj.deaths}</b></td>
 <td><b>${obj.recovered}</b></td>`;
 document.getElementById('national_data').innerHTML = output;
} 

function refresh(){
    document.getElementById('refresh').addEventListener('click',()=>{
        clearData('national_data');
        init();
    })
}
function clearData(id){
    document.getElementById(id).innerHTML = '';
}
// chart 
let statesarr=[],confirmedarr=[],recoveredarr=[],deathsarr=[];
async function chartData(){
    let res = await fetch('https://api.covid19india.org/data.json');
    let data = await res.json(); 
    let obj = data.statewise;
       obj.forEach((item)=>{
           statesarr.push(item.state); 
           confirmedarr.push(item.confirmed);
           recoveredarr.push(item.recovered);
           deathsarr.push(item.deaths);
       })
       statesarr.shift() 
       confirmedarr.shift()
       recoveredarr.shift();
       deathsarr.shift();

       console.log(statesarr);
    }
// draw the chart
function createChart()
{
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',

    // The data for our dataset
    data: {
        labels: statesarr,
        datasets: [{
            label: 'Confirmed Cases',
            backgroundColor: 'rgb(135,206,235)',
            borderColor: 'rgb(135,206,235)',
            data: confirmedarr,
            minBarLength : 100
        }, 
        {
            label: 'Recovered Cases',
            backgroundColor: '#2ecc71',
            borderColor: '#2ecc71',
            data: recoveredarr
        },
        {
            label: 'Deceased Cases',
            backgroundColor: '#fc2003',
            borderColor: '#fc2003',
            data: deathsarr,
            type: 'line'
        }
    ]
    },

    // Configuration options go here
    options: {}
});
}