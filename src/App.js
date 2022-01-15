import React, {useState,} from "react";
import axios from "axios";

import './App.css'
import _, { findLastKey } from 'lodash'

function App() {
  const [city, setCity] = useState('jizzax')
  const [weather, setWeather] = useState([])
  const [trues, setTrues]=useState(findLastKey)
  const access_key = '0cd3eaec14af5b2bae0d83c423c13c65'
  const GET_URL = "http://api.weatherstack.com/current?access_key=" + access_key + "&query=" + city


  const weathetApp = () => {
    axios.get(GET_URL)
      .then(res => {
        setWeather(_.get(res, 'data', []))
        console.log(res);
        setTrues(true)
      })
  }

  return (
    <div className="App">
      <header className="App-header">

      <input type="text"  onChange={(e)=> setCity(e.target.value)}/>
        <button onClick={weathetApp}>search</button>

        {trues===true?
         <div className='weatherTable'>
          <div>
            <h2>{weather.location.country}</h2>
            <h2>{weather.location.name}</h2>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div className="selsy">
                <img src={weather.current.weather_icons[0]} alt="" />
                <h2>{weather.current.temperature} C '</h2>
              </div>
              <div>
                <h5> {weather.current.wind_speed}</h5>
              </div>
            </div>

          </div>
        </div>
     :  <div></div> }
       
       
      </header>
    </div>
  );
}

export default App;
