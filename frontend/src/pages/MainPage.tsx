import React from 'react'
import Card from '../components/CustomCard'
import TextInput from '../components/TextInput'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from 'react'
import '../styles/MainPage.css'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import SideBar from '../components/SideBar';


function DoGeolocation({setBackEndData, name} : any) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    
    function success(pos : any) {
        var crd = pos.coords;
      
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        //axios call here
        axios.post('http://localhost:5000/post-suggestions', 
        {"name" : "name", "longitude" : crd.longitude, "latitude" : crd.latitude}).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                setBackEndData(response.data)
              }
            }, (error) => {
              console.log(error);
        });
    }
    
      
    function errors(err: any) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    function componentDidMount() {
            if (navigator.geolocation) {
              navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                  if (result.state === "granted") {
                    console.log(result.state);
                    //If granted then you can directly call your function here
                    navigator.geolocation.getCurrentPosition(success);
                    
                  } else if (result.state === "prompt") {
                    console.log(result.state);
                    navigator.geolocation.getCurrentPosition(success, errors, options);
    
                  } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                  }
                  result.onchange = function () {
                    console.log(result.state);
                  };
                });
            } else {
              alert("Sorry Not available!");
            }
    }
    componentDidMount()
}


function MainPage() {
    const [cardWidth, setCardWidth] = useState(100)
    const [cardContracted, changeCardBool] = useState(false)


    const bgColor = "#B1E3E6";
    const styles = {
        backgroundColor: bgColor,
        height: "100vh",
    };

    const [classCard, setClassCard] = useState("btn-true")
    const [backEndData, setBackEndData] = useState([]);
    const [name, setName] = useState("meat")

    function callBackend(textinput: string){
        axios.post('http://localhost:5000/post-suggestions',
        {"name" : textinput}).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                setBackEndData(response.data)
              }
            }, (error) => {
              console.log(error);
        })
    }

    useEffect(() => {
        DoGeolocation({setBackEndData, name})
    }, [setBackEndData])

    let changeCardWidth = () => {
        if (!cardContracted) {
            setCardWidth(100)

            changeCardBool(true)

        } else {
            setCardWidth(300)

            changeCardBool(false)

        }
    }
    let changeClass = () => {
        if (cardContracted) {
            setClassCard("btn-true")
            console.log(classCard)
            changeCardBool(true)
        } else {
            setClassCard("btn-false")
            console.log(classCard)
            changeCardBool(false)
        }
    }

    if (backEndData.length > 0 ) {
        return <p>wowww got data from backend</p>
    }
    function doSomething(arg1:any){
        console.log(arg1)
    }

    return (
        <div style={styles}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography
                    variant="h1"
                    style={{
                        fontSize: '64px',
                        fontWeight: 520,
                    }}>SHOPGRADE</Typography>
            </Box>
            <Box >
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '15', marginRight: '20' }}>
                    <div>
                        <TextInput functionToCall={callBackend}></TextInput>
                        
                    </div>
                    <SideBar></SideBar>
                </Box>
            </Box>
        </div>
    )
}


export default MainPage
