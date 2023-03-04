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
import SideBar from '../components/SideBar';



function MainPage() {
    const [cardWidth, setCardWidth] = useState(100)
    const [cardContracted, changeCardBool] = useState(false)
    const bgColor = "#B1E3E6";
    const styles = {
        backgroundColor: bgColor,
        height: "100vh",
    };
    const [classCard, setClassCard] = useState("btn-true")
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
                        <TextInput></TextInput>
                    </div>
                    <SideBar></SideBar>
                </Box>
            </Box>
        </div>
    )
}


export default MainPage
