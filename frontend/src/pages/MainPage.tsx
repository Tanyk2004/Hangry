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




function MainPage() {
    const [cardWidth, setCardWidth] = useState(100)
    const [cardContracted, changeCardBool] = useState(false)
    const containerRef = React.useRef(null);
    const bgColor = "#B1E3E6";
    const styles = {
        backgroundColor: bgColor
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
        <div style = {styles}>
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography 
                variant="h1" 
                style={{ fontFamily: 'sans-serif', 
                fontSize: '64px', 
                fontWeight: 520, 
                fontStyle: 'italic'}} >SHOPGRADE</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>

                <Box sx={{
                    display: 'flex',
                    paddingTop: 2,
                    flexGrow: 1,
                    transform: 'translateX(50%)',
                }}>
                    <TextInput></TextInput>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: 0.1,
                }} >
                    <Button variant="contained"
                        className='btn-true'
                        color="primary"
                        size="large"
                        onClick={changeClass}
                        sx={{ marginTop: 2, marginBottom: 2, flexGrow: 0.2, maxHeight: 50 }}>DONE</Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex" }} paddingTop={5} paddingBottom={5}>
                <Box sx={{ width: 30 }}>
                </Box>
                <Box sx={{ flexGrow: 1.5, alignItems: 'center' }} className = {classCard}>
                    <Card title="Card left"
                        content="Something random"
                        maxWidth={cardWidth}
                        maxHeight={100}
                        minHeight={100}
                        contracted={true}
                    ></Card>
                </Box>
                <Box sx={{ width: 10 }} />
                <Box sx={{ flexGrow: 0.5 }} >
                    <Box sx={{ width: 200 }} ref={containerRef} >
                        <FormControlLabel
                            control={<Switch checked={cardContracted} onChange={changeCardWidth} />}
                            label="Show from target"
                        />
                        <Slide direction="left" in={cardContracted} container={containerRef.current}>
                            {
                                <div >
                                    <Card title="Card left" 
                                        contracted={true}
                                        minHeight={100}
                                        maxHeight={100}
                                        maxWidth={100}
                                        minWidth={100}
                                    ></Card>
                                </div>

                            }
                        </Slide>
                    </Box>
                </Box>
            </Box>
        </Box>
    </div>
    )
}


export default MainPage
