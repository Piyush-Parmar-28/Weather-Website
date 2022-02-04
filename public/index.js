apiKey = "06889479cb38a591f3b16a8f5e56d9c0";
/* city = 'sheoganj'; */
//CompleteUrl= `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

var Url1 = 'https://api.openweathermap.org/data/2.5/weather?q='
var Url2a = `&appid=${apiKey}&units=metric`
var Url2b = `&appid=${apiKey}&units=imperial`

unit1= 'metric'
unit2= 'imperial'

// Creating today's day & date
const weekArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const monthArray = ["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Octr","Nov","Dec"];

const d = new Date();
let day = weekArray[d.getDay()];
let date = d.getDate();
let month = monthArray[d.getMonth()];
let year = d.getFullYear();

date= day+ ", "+ date+ " "+ month+ ", "+ year;

// Dispalying the search svg by default
showSearchSvg()

const searchCity = document.querySelector('.searchCity')
// Creating Search Functionality
searchCity.addEventListener('submit', (event) => {

    // Preventing default submission of the form
    event.preventDefault();

    // 'window' object is used to declare variables inside a function as 'global variable'
    window.searchContent = document.getElementById('searchText').value;

    console.log(searchContent)

    if (searchContent) {
        getData(Url1 + searchContent + Url2a);
    }

    else {
        showSearchSvg()
    }

})


// Creating getData() function to get weather data from the API
function getData(url) {

    console.log(url)
    console.log(Url1 + searchContent+ Url2a)

    console.log(searchContent)

    if (url == Url1 + searchContent+ Url2a) {
        unit= "C";
    }

    else{
        unit= "F"
    }

    console.log(unit)

    fetch(url).then(res => res.json()).then(data => {
        // Displaying the data json
        console.log(data)

        // If the serached city is not available, then display 404 not found page
        if (data.cod == 404) {
            notFoundSvg()
        }

        else{
            showWeather(data, unit)
        }

    })
}

function showSearchSvg(){
    display = `
        <div class="card">
            <h3 class="card-title text-center mt-1" style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">Search a City...</h3>
            <img src = "search.svg" class="mx-4 my-lg-2 my-0" alt="My Happy SVG" style="height: 400px;"/>
        </div>
    `

    document.getElementById('weatherwidget').innerHTML= display;
}

function notFoundSvg(){
    display = `
        <div class="card">
            <h3 class="card-title text-center mt-1" style="font-family: 'Times New Roman', Times, serif; font-weight: bold;">Oops... No data available</h3>
            <img src = "404.svg" class="mx-4 my-lg-2 my-0" alt="My Happy SVG" style="height: 400px;"/>
        </div>
    `

    document.getElementById('weatherwidget').innerHTML= display;
}

// Getting the search URL starting from ?
const queryString = window.location.search;

/* // Breaking (parsing) the queryString into parts, so that each data can be retreived
const urlParams = new URLSearchParams(queryString);

// Getting the value of 'id' in the url 
var unitp = urlParams.get('units')
console.log(unitp) */


/* Function to display result */
function showWeather(data, unit) {

    if(unit== "C"){
        var active1= "active"
        var active2= ""
    }
    else{
        var active1= ""
        var active2= "active"
    }

    // Converting visibility data into Km
    data.visibility= data.visibility/1000

    // Converting HectoPascal into Kilo pascal
    data.main.pressure= data.main.pressure*0.1;
    // Extracting preassure only upto two decimal places
    let pressure = data.main.pressure.toFixed(2);

    display = `
        <div class="card">
            <div class="card-body">

                <h5>
                    <img src="sun.png" alt="..." style="height: 40px;">

                    <span class="float-end units">

                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item" role="presentation">

                                <button class="nav-link ${active1}" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onclick="getData('${Url1 + searchContent + Url2a}')">°C</button>
                            
                            </li>

                            <li class="nav-item" role="presentation">

                                <button class="nav-link ${active2}" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onclick="getData('${Url1 + searchContent + Url2b}')">°F</button>

                            </li>

                        </ul>

                    </span>
                </h5>
                
                <div class= "d-flex justify-content-between mt-4 upperText">
                    <h5 class="card-title" style="font-family:'Times New Roman', Times, serif">${data.name}, ${data.sys.country}</h5>

                    <h5 class="card-title" style="font-family:'Times New Roman', Times, serif">${date}</h5>
                </div>
                
                
        
                <div id="tempcard">
                    <h1 class="mb-2 text-center temp" style="font-family:'Times New Roman', Times, serif">${data.main.temp} °${unit}</h1>
                </div>

                <div class="overflow-hidden">

                            <div class="row gy-4">

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                        <i class="bi bi-thermometer-sun" style="font-size: 4rem; color: orange"></i>
                                        <div class="card-body">
                                          <h3 class="card-title" style= "font-weight: bold;">Feels Like</h3>
                                          <h4 class="card-text"  style="font-family:'Times New Roman', Times, serif">${data.main.feels_like} °${unit}</h4>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                        <i class="bi bi-wind" style="font-size: 4rem; color: yellow"></i>
                                        <div class="card-body">
                                          <h3 class="card-title" style= "font-weight: bold; ">Wind Speed</h3>
                                          <h4 class="card-text"  style="font-family:'Times New Roman', Times, serif">${data.wind.speed} m/sec</h4>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                        <i class="bi bi-arrows-angle-contract" style="font-size: 4rem; color: red"></i>
                                        <div class="card-body">
                                          <h3 class="card-title" style= "font-weight: bold;">Preassure</h3>
                                          <h4 class="card-text"  style="font-family:'Times New Roman', Times, serif">${pressure} KPa</h4>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                        <i class="bi bi-binoculars-fill" style="font-size: 4rem; color: rgb(3, 53, 0)"></i>
                                        <div class="card-body">
                                          <h3 class="card-title" style= "font-weight: bold;">Visibility</h3>
                                          <h4 class="card-text"  style="font-family:'Times New Roman', Times, serif">${data.visibility} Km</h4>
                                        </div>
                                    </div>

                                </div>


                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                        <i class="bi bi-droplet-half" style= "color: blue; font-size: 4rem;"></i>
                                        <div class="card-body">
                                          <h3 class="card-title" style= "font-weight: bold;">Humidity</h3>
                                          <h4 class="card-text" style="font-family:'Times New Roman', Times, serif">${data.main.humidity} %</h4>
                                        </div>
                                    </div>

                                </div>

                                

                                <div class="col-lg-4 col-sm-6">

                                    <div class="card text-center" >
                                        <i class="bi bi-cloud-sun-fill" style="font-size: 4rem; color: gray; "></i>
                                        <div class="card-body">
                                          <h3 class="card-title" style= "font-weight: bold;">Condition</h3>
                                          <h4 class="card-text" style="font-family:'Times New Roman', Times, serif">${data.weather[0].description}</h4>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>


            </div>
        </div>
    `

    document.getElementById('weatherwidget').innerHTML= display;

}