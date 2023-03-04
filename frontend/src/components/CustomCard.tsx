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
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface Props {
  title: string;
  description: string;
  content: string;
}

export default function BasicCard(props: Props) {



  return (

    <Card sx={{
      maxWidth: 200,
      background: COLORS.card_background,
      borderRadius: 3,
      '&:hover': {
        background: COLORS.item_sustainable,
        transition: 'background 0.5s ease-in-out',
      }
    }} raised={true} >
      <CardContent>
      <Typography sx={{ fontSize: 38, fontWeight: 'medium' }} color="text.primary" gutterBottom>
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.description}
        </Typography>
      </CardContent>
    </Card>

  );
}