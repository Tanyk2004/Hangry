//import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { COLORS } from '../values/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import React, { useState } from "react";


// defines a bunch of properties that we can customize for the card
interface Props {
  title?: string;
  content?: string;
  description?: string;
  maxWidth: number;
  minWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  contracted: boolean;
  sustainable?: boolean;
  alternative?: string;
  setClicked: any;
}


/**
 * This is a custom card component that we can use to display information
 * @param props
 * title, content, description are all optional and are just text with varying sizes
 * contracted is a boolean that determines whether the card is contracted or not
 * it is the only one that is not optional to help us decide its orientation
 */


// creates a theme for the card which helps us create transitions and animations
const customTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.card_background
    },
    success: {
      main: COLORS.item_sustainable
    },
    error: {
      main: COLORS.item_unsustainable
    }
  },
});

export default function BasicCard(props: Props) {

  const [isClicked, setIsClicked] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [title, setTitle] = useState(props.title);

  const sustainable = props.sustainable; //get this boolean from backend
  const color = sustainable ? COLORS.item_sustainable : COLORS.item_unsustainable;
  const [thisColor, setColor] = useState(color)

  const handleButtonClick = () => {
    setShowButton(!showButton);
    setIsClicked(!isClicked);
    props.setClicked(!isClicked);
  }
  const handleButtonClickAccept = () => {
    setShowButton(!showButton);
    setIsClicked(!isClicked);
    props.setClicked(!isClicked);
    setTitle(props.alternative) //input new title from backend
    setColor(COLORS.item_sustainable);
  }

  const handleClick = () => {
    if (!sustainable) {
      console.log(`Handling click: ${!isClicked}`)
      setIsClicked(!isClicked);
      console.log(isClicked);
      props.setClicked(!isClicked);
      setShowButton(!showButton);
    }
  };

  let foo = () => {
    return props.contracted;
  }

  const newWidth = isClicked ? props.maxWidth * 0.7 : props.maxWidth;
  console.log(props.content)

  const hoverStyle = sustainable ? {} : {
    background: COLORS.gray,
    transition: 'background 0.1s ease-in-out',
  }
  const styleType = sustainable ? {} : { flexGrow: 1, flexShrink: 1, flexBasis: 2 }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'center',
    }}>
      <Card
        sx={{
          maxWidth: newWidth,
          minWidth: newWidth,
          minHeight: props.minHeight,
          maxHeight: props.maxHeight,
          marginTop: 1,
          width: {
            xs: 100, // theme.breakpoints.up('xs')
            sm: 200, // theme.breakpoints.up('sm')
            md: 300, // theme.breakpoints.up('md')
            lg: 400, // theme.breakpoints.up('lg')
            xl: 500, // theme.breakpoints.up('xl')
          }, // This makes the card responsive by setting responsive widths
          background: thisColor,
          borderRadius: 3,
          transition: 'background transform 0.1s ease-in-out',
          transitionDuration: '0.1s',


          '&:hover': hoverStyle
        }} raised={sustainable}
        style={styleType}
        onClick={handleClick}
      >


        <CardContent>
          <Typography sx={{ fontSize: 25, fontWeight: 'medium' }} variant='h1' color="text.primary" gutterBottom>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.description}
          </Typography>
        </CardContent>
        {isClicked && !sustainable && (
          <CardActions>
            <Button onClick={handleClick}>Reset</Button>
          </CardActions>
        )}
      </Card>
      <>
        {isClicked && !sustainable &&
          <Button
            style={{ flexGrow: 0, flexShrink: 1, flexBasis: 0, maxHeight: 55, minHeight: 55 }}
            variant="contained"
            sx={{ bgcolor: COLORS.item_sustainable, boxShadow: 10 }}
            onClick={handleButtonClickAccept}
          >
            ACCEPT
          </Button>

        }
      </>
      {isClicked && !sustainable &&
        <Button style={{ flexGrow: 0, flexShrink: 1, flexBasis: 0, maxHeight: 55, minHeight: 55 }}
          variant="contained"
          sx={{ bgcolor: COLORS.item_unsustainable }}
          onClick={handleButtonClick}
        >
          REJECT
        </Button>
      }
    </div>

  );
}
