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
import cardClicked from '../components/CustomCard'

interface Props {
    isClicked : boolean;
    title?: string;
    firstAlternative?: string;
    firstImpact?: string;
    firstPrice?: string;
    firstLink?: string;

    secondAlternative?: string;
    secondImpact?: string;
    secondPrice?: string;
    secondLink?: string;

    //content?: string;
    maxWidth?: number;
    minWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    contracted?: boolean;
}

function SideBar(props:Props) {
    const containerRef = React.useRef(null);
    const [cardContracted, changeCardBool] = useState(false)
    
    return (
        <div>

            <Box sx = {{width : 'fill' , marginLeft : 10}}>
                <Box ref={containerRef} >
                    <Slide direction="left" in={props.isClicked} container={containerRef.current}>
                        {
                            <div >
                                <Card title="Suggested Alternatives to the Product"
                                    firstAlternative = {props.firstAlternative}
                                    firstImpact = {props.firstImpact}
                                    firstPrice = {props.firstPrice}
                                    firstLink = {props.firstLink}
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
