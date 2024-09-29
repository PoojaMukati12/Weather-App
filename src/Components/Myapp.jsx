import React from 'react'
import { useState } from 'react'
import rain from '../Images/rain.png'
import Cloud from '../Images/cloud.png'
import Mist from '../Images/Mist.png'
import Clear from '../Images/clear.png' 
import Error from '../Images/err.png'

const Myapp = () => {
    const [search, setsearch] = useState('')
    const [data, setdata] = useState('')
    const [error, seterror] = useState('')
    const API_key="b68ee6197fe6a8da38105cd0e384e8c0"

  const myfun =async ()=>{
    let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`)
    let jsondata=await data.json();
    console.log(jsondata);
    
    setdata(jsondata);

    if(search === ""){
        // alert("Please Enter Name")
       seterror("Please Enter Name!!")
    }
    else if (jsondata.cod == "404"){
        // alert('Please enter valid city')
        seterror("Please Enter Valid Name!")
    }
    setsearch("")
  }
  return (
    <>
        <div className="container">
            <div className="inputs">
                <input placeholder='enter city name'  value={search} onChange={(e)=>setsearch(e.target.value)}></input>
                <button onClick={myfun}><i class="ri-search-line"></i></button>
            </div>
            <div>
                {
                    error ?
                    <div className='weathers'>
                        <p className='p'>{error}</p>
                        <img src={Error}/>
                    </div> :" "
                }
                {
                    data && data.weather ?
                    <div className='weathers'>
                        <h2 className='name'>{data.name}</h2>
                        <img  src={data.weather[0].main == "Clouds" ? Cloud : " "}/>
                        <img  src={data.weather[0].main == "Rain" ? rain : " "}/>
                        <img  src={data.weather[0].main == "Clear" ? Clear : " "}/>
                        <img   src={data.weather[0].main == "Mist" ? Mist : " "}/>
                        <img   src={data.weather[0].main == "scattered clouds" ? Cloud : " "}/>
                        <img   src={data.weather[0].main == "Haze" ? Cloud : "" }/>
                        <h2 className='temp'>{Math.trunc(data.main.temp)}℃</h2>
                        <h2 className='des'>{data.weather[0].description}</h2>
                    </div> : " "
                }
            </div>
        </div>

    </>
  )
}

export default Myapp