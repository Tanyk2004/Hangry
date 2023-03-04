import * as React from 'react';
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
import { typeCards } from '../values/enums';


// defines a bunch of properties that we can customize for the card
interface Props {
  title?: string;
  content?: string;
  maxWidth?: number;
  minWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  type: typeCards;

}

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

// creates a styled component for the avatar
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.main};
    transform: scale(1.3);
  }
  `}
`;

export default function BasicCard(props: Props) {
  return (
    <ThemeProvider theme={customTheme}>
    <Card sx={{ 
      maxWidth: props.maxWidth,
      minWidth: props.minWidth,
      minHeight: props.minHeight,
      maxHeight: props.maxHeight,
      width: {
        xs: 100, // theme.breakpoints.up('xs')
        sm: 200, // theme.breakpoints.up('sm')
        md: 300, // theme.breakpoints.up('md')
        lg: 400, // theme.breakpoints.up('lg')
        xl: 500, // theme.breakpoints.up('xl')
      }, // This makes the card responsive by setting breakpoints for the width
      height: {height: '100%'},
      background: COLORS.card_background,
      borderRadius: 3,
      '&:hover': {
        background: COLORS.item_sustainable,
        transition: 'background 0.5s ease-in-out',
      }
    }} raised={true} >
      <CardContent>
        <Typography sx={{ fontSize: 38, fontWeight: 'medium' }} variant='h1' color="text.primary" gutterBottom>
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.content}
        </Typography>
      </CardContent>
    </Card>
    </ThemeProvider>

  );
}