const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const img = document.querySelector('img.time')
const icon = document.querySelector('.shekl')
const UI = data =>{
    const city = data.catchCity;
    const weather = data.catchWeather;
    //console.log(city);
    //console.log(weather);
    details.innerHTML=`
    <h5 class="my-3">${city.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    let iconSRC = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src' , iconSRC); 

    let timeSRC = null;
    if(weather.IsDayTime){
        timeSRC = 'img/day.svg'
    }else{ timeSRC = 'img/night.svg'}
    img.setAttribute('src' , timeSRC);

    
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    };
};

const update = async(city)=>{
    const catchCity = await getCity(city);
    const catchWeather = await getWeather(catchCity.Key);
     
    return{ catchCity,catchWeather};
};

cityForm.addEventListener('submit', a =>{
    a.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

update(city)
    .then(data => UI(data))
    .catch(err=> console.log(err));

});

