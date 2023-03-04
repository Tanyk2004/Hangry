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
import { wrap } from 'module';



interface Props {
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


function SideCard(props: Props) {
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
  return (
    <div>
      <Card sx={{
      width: 'fill',
      minHeight: props.minHeight,
      maxHeight: props.maxHeight,
      marginTop: 3,
      
      background: COLORS.card_background,
      borderRadius: 3,
      transition: 'background transform 0.5s ease-in-out',
      transitionDuration: '0.3s',
      
    }} raised={true} >
      <CardContent>
        <Typography sx={{ fontSize: 25, fontWeight: 'medium' }} variant='h1' color="text.primary" gutterBottom>
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {props.firstAlternative}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {props.firstImpact}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {props.firstPrice}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          {props.firstLink}
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default SideCard
