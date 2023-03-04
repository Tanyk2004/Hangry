import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from 'react'
import '../styles/MainPage.css'
import Card from '../components/SideCard'




function SideBar() {
    const containerRef = React.useRef(null);
    const [cardContracted, changeCardBool] = useState(false)
    let changeClass = () => {
        changeCardBool(!cardContracted)
    }
    return (
        <div>

            <Box sx = {{width : 'fill'}}>
                <Button onClick={changeClass}>Hello</Button>
                <Box ref={containerRef} >
                    <Slide direction="left" in={cardContracted} container={containerRef.current}>
                        {
                            <div >
                                <Card title="Card left"
                                    contracted={true}
                                    minHeight={500}
                                    maxHeight={500}
                                ></Card>
                            </div>
                        }
                    </Slide>

                </Box>
            </Box>
        </div>
    )
}

export default SideBar
