
let apiKey='dcc9ab6a8cae4967e341cec0cde06ec9';

let card=document.querySelector('.card');
let buttonSubmit=document.querySelector('button');
let inputValue=document.querySelector('input');
let weatherCard=document.querySelector('.weather');
let errorDisplay=document.querySelector('.error');



inputValue.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        buttonSubmit.click();   
    }
});


buttonSubmit.addEventListener('click',async event=>{
    event.preventDefault();
    let city=inputValue.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }else{
        displayError('Please Enter valid City Name');
    }
})

async function getWeatherData(city){
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response=await fetch(apiUrl);
    if(!response.ok){
        throw new Error('Please Enter Valid City Name');
    }

    return await response.json();
}

function displayWeatherInfo(data){
           const { name:city,
                    main:{temp,humidity},
                    wind:{speed},
                        weather
            }=data
            let weatherCondition = weather[0].main;
       weatherCard.style.display='block';

          let temprature=document.querySelector('.temp');
          let wetherResponse=document.querySelector('.wetherResponse');
          let cityName=document.querySelector('.city');
          let humidityDis=document.querySelector('.humidity');
          let windDis=document.querySelector('.wind');
          let WeatherEmoji=document.querySelector('.Weather-emoji');

        
          if (WeatherEmoji) {
            errorDisplay.style.display='none';
            WeatherEmoji.src = getWeatherEmoji(weatherCondition);
        }


          temprature.textContent=`${temp.toFixed(1)}°C`
          cityName.textContent=city;
          humidityDis.textContent=`${humidity}%`;
          windDis.textContent=`${speed} Km/h`;
          
}

function getWeatherEmoji(weatherId){   
            switch(true){
                case weatherId==="Clouds":
                    return 'images/clouds.png';
                     break;
                case weatherId==="Clear":
                    return 'images/clear.png';
                    break;
                case weatherId==="Rain":
                    return 'images/rain.png';
                    break;

                case weatherId==="Drizzle":
                    return 'images/drizzle.png';
                    break;

                case weatherId==="Mist":
                    return 'images/mist.png';
                    break;
                default:
                        return 'Nothing'
            }
}

function displayError(message){
    errorDisplay.textContent=message;
    errorDisplay.style.display='block';
    weatherCard.style.display='none';
    card.classList.add('shake');

    // Remove shake effect after animation completes
    setTimeout(() => {
        card.classList.remove('shake');
    }, 300);
}