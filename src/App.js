import React, { useState } from 'react';


const api = {
  key:"75f7c6b4baecaeaafe7b0113cdd1b0f5",
  base:"https://api.openweathermap.org/data/2.5/"
}


function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  
  const search = (event) => {
    if (event.key === "Enter") { 
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(res => res.json())   //// Input stream received (Json)
     .then(result => {
       setWeather(result);
       setQuery('');
       console.log(result);
      });  /// asigned json stream to result
    }
  }

  const dateBuilder = (d) => {
   let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", 
   "Aug", "Sept", "Oct", "Nov", "Dec"];

   let days = ["Sun", "Mon", "Tue", "Wednesday", "Thru", "Fri", "Sat"];

   let day = days[d.getDay()]; /// fetches day between 0-6
   let date = d.getDate();
   let month = months[d.getMonth()];
   let year = d.getFullYear();

   return `${day} ${date} ${month} ${year}`

  }

  return (
    <div className="App" data-test-id="app-1">


      <main>
        <div className="search-box">
        <input className="search-bar" type="text" placeholder="Search here.." 
        onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>  
        </div>

        
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
         <div className="location">{weather.name} {weather.sys.country}</div>
         <div className="date">{dateBuilder(new Date())}</div>
        
         <div className="weather-box">
         <div className="temp">
          {Math.round(weather.main.temp)}°c    
          </div>
         <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        </div>
        ) : ('')}       
      </main>

    </div>
  );
}

export default App;


///<Container maxWidth="xs"></Container>