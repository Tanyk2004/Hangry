import React from 'react'
import Card from '../components/CustomCard'
import TextInput from '../components/TextInput'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import {typeCards} from '../values/enums'
function MainPage() {
    const [cardWidth, setCardWidth] = useState(100)
    const [cardContracted, changeCardBool] = useState(false)

    let changeCardWidth = () => {
        if (!cardContracted) {
            setCardWidth(100)
            changeCardBool(true)
        } else {
            setCardWidth(300)
            changeCardBool(false)
        }
    }

    return (
        <div>

            <Card title="Generic Title"
                content="Something random"
                maxWidth={cardWidth}
                maxHeight={200}
                minHeight={200}
                type={typeCards.drawer}
            ></Card>
            <TextInput></TextInput>
            <Button onClick={changeCardWidth}>Click me</Button>
        </div>
    )
}


export default MainPage
