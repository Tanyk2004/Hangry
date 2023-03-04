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

  const handleClick = () => {
    console.log(`Handling click: ${!isClicked}`)
    setIsClicked(!isClicked);
  };

  let foo = () => {
    return props.contracted;
  }

  const newWidth = isClicked ? props.maxWidth * 0.7 : props.maxWidth;
  console.log(props.content)

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
      background: foo() ? COLORS.card_background : COLORS.item_sustainable,
      borderRadius: 3,
      transition: 'background transform 0.1s ease-in-out',
      transitionDuration: '0.1s',
       '&:hover': {
         background: COLORS.gray,
         transition: 'background 0.1s ease-in-out',
       }
    }} raised={true}
      style={{flexGrow: 1, flexShrink: 1, flexBasis: 2}}
      onClick={handleClick}
    >
      <CardContent>
        <Typography sx={{ fontSize: 25, fontWeight: 'medium' }} variant='h1' color="text.primary" gutterBottom>
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.description}
        </Typography>
      </CardContent>
      {isClicked && (
        <CardActions>
          <Button onClick={handleClick}>Reset</Button>
        </CardActions>
      )}
    </Card>
    {isClicked &&
      <Button style={{flexGrow: 0, flexShrink: 1, flexBasis: 0}}>Hello</Button>
    }
    {isClicked &&
      <Button style={{flexGrow: 0, flexShrink: 1, flexBasis: 0}}>Delete</Button>
    }
    </div>

  );
}
