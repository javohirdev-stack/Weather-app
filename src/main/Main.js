import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'
import _, { findLastKey } from 'lodash'

const Main = () => {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState([])
    const [trues, setTrues] = useState(findLastKey)
    const [eror, setEror] = useState(false)
    const [loadin, setLoadin] = useState(false)
    const [label, setLabel] = useState(false)
    const access_key = '0cd3eaec14af5b2bae0d83c423c13c65'
    const GET_URL = "http://api.weatherstack.com/forecast?access_key=" + access_key + "&query=" + city


    // ===============================================================================//

    const weathetApp = () => {

        let b = true

        if (city.length < 1) {
            b = false
            setLabel(true)
        }

        if (b) {
            setLoadin(true)

            axios.get(GET_URL)
                .then(res => {

                    if (res.data.success !== false) {
                        setWeather(_.get(res, 'data', []))
                        console.log(res);
                        setTrues(true)
                    } else {
                        setEror(true)
                    }

                    setLoadin(false)
                })
                .catch(er => {

                })
        }

    }

    return (<>
        <header className="App-header">
            {label === true ? <label><small> Shahar yoki davlat nomini yozing!</small></label> : <label></label>}
            <input type="text" onChange={(e) => { setCity(e.target.value); setEror(false); setLabel(false) }} />
            <button onClick={weathetApp}>
                {loadin === true ? <div className="loadin"></div> : "search"}

            </button>


            {eror === true ? <div><h2>Shahar nomini to'g'ri kiriting!</h2></div> : <div></div>}
            {trues === true ?


                <div className='weatherTable'>
                    <div>
                        <h2>{weather.location.name},{weather.location.region}, {weather.location.country}</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-around ', alignItems: 'center' }}>
                            <div className="selsy">
                                <img src={weather.current.weather_icons[0]} alt="" />
                                <p>{weather.current.weather_descriptions}</p>
                            </div>
                            <div className="selsi">
                                <h2>{weather.current.temperature}<i className="far fa-circle"></i>c</h2>
                            </div>
                            <div className="iconSelsi">
                                <span>shamol tezligi: {weather.current.wind_speed}km/soat</span>
                                <span>namlik: {weather.current.humidity} %</span>
                                <span>bosim: {weather.current.pressure}mb</span>

                            </div>
                        </div>
                        <div className="time"> <p><i className="far fa-clock"></i> {weather.location.localtime}</p></div>
                    </div>
                </div>
                : <div></div>}

        </header>
    </>)
}
export default Main;