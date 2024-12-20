const weather = {
    0: "Clear sky ☀️",
    1: "Mainly clear 🌤️",
    2: "Partly cloudy ⛅",
    3: "Overcast ☁️",
    45: "Foggy 🌫️",
    48: "Depositing rime fog 🌫️",
    51: "Light drizzle 🌧️",
    61: "Light rain 🌦️",
    63: "Moderate rain 🌧️",
    71: "Light snow ❄️",
    95: "Thunderstorm ⛈️"
};

const weather5 = {
     0:"☀️",
     1:"🌤️",
     2:"⛅",
     3:"☁️",
    45:"🌫️",
    48:"🌫️",
    51:"🌧️",
    53:"🌧️",
    55:"🌧️",
    56:"🌧️",
    57:"🌧️",
    61:"🌦️",
    63:"🌧️",
    65:"🌧️",
    66:"🌧️",
    67:"🌧️",
    71:"❄️",
    73:"❄️",
    75:"❄️",                            
    95:"⛈️"
};




function checkWeather()
  {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686&current_weather=true&timezone=Europe/Stockholm")

    .then(response => response.json())
    .then(data => {console.log(data);

    document.querySelector(".temp").innerHTML= Math.round(data.current_weather.temperature)+"°C";
  

     let imageicon=data.current_weather.weathercode;  //find icon

        for(let i=0; i<100;i++)
            {
                if(weather[imageicon]==weather[i])
                    {
                       document.querySelector(".iconimage").innerHTML= weather[i];
                    }
           
            }     
        let Time =new Date();

    document.querySelector(".time").innerHTML= "  "+Time.toTimeString().split(" ")[0]+"<br>"+Time.toISOString().split("T")[0];
    document.querySelector(".windkm").innerHTML=data.current_weather.windspeed+"Km";
    document.querySelector(".latitude").innerHTML=(data.latitude).toFixed(2);
    document.querySelector(".longitude").innerHTML=(data.longitude).toFixed(2);
    
            

}
        )

 
}
    checkWeather();

    
function checkWeather5()    //for 5 days prognos.
   {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Stockholm&forecast_days=5")

    .then(response => response.json())
    .then(data => {console.log(data);

         let icon=data.daily.weathercode; //find icon

        let icons="";

         for(let j=0;j<5;j++)
            { 
                let x ="";
                x=icon[j];
                icons+= weather5[x]+" ";


            }
        document.querySelector(".icon").innerHTML=icons;                

        
         let newMin="";
        let newMax="";
        let dates=""

      for (let i = 0; i < 5; i++) 
       {
         newMin += Math.round(data.daily.temperature_2m_min[i])+"°C"+" " ;
         newMax += Math.round(data.daily.temperature_2m_max[i])+"°C"+" " ;
         dates += data.daily.time[i]+" " ;

       }

      document.querySelector(".min_temp").innerHTML= newMin;
      document.querySelector(".max_temp").innerHTML=newMax;


      
                })
    }
    checkWeather5();

    // for 5 days data.
    const days = ["Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"];
    var today= new Date();
    var day1 =today.getDay();

    
   
    var dateToday = new Date();    // get 5 dates
    var dateT=dateToday.getDate();          
    
    var month= dateToday.getMonth();
    var year=dateToday.getFullYear();

    




    let day="";
    let date5="";
    let j=0; // counter for 5 days

    for (let i = day1; i < days.length; i++) 
        {
                if(j==5){break;}
           day += days[i]+" ";
           date5 += (year+"-"+(month+1)+"-"+(dateT+1+j)+" ");
           j++

        }

        for (let i =0; i<day1; i++) 
            {   
                if(j==5){break;}


               day+= days[i]+" " ;
               date5 += (year+"-"+(month+1)+"-"+(dateT+1+j)+" ");


               j++


               
            }
    

    document.getElementById("nrOfdays").innerHTML=day; 
    document.getElementById("date").innerHTML= date5; 

   