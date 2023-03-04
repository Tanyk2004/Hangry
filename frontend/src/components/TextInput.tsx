import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/Box';
import Collapse from '@mui/material/Box';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Card from './CustomCard';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Box';

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";


function TextInput() {

  const [inputValue, setInputValue] = useState('');
  const [inputValues, setInputValues] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && (e.target as HTMLInputElement).value !== '') {
      console.log('old: ', inputValues);
      console.log(inputValue);
      e.preventDefault();
      setInputValues(inputValues.concat(inputValue.trim()));
      setInputValue('');
      console.log(inputValues);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
  };


  return (
    <div>
      <TextField 
        id="outlined-basic"
        sx={{
          width: { md: 800 },
          "& .MuiInputBase-root": {
            height: 55
          },
        
        boxShadow: 10,
        textAlign: 'center'
        }}
        
        label ="Add an Item To Your Shopping List" 
        value = {inputValue}
        variant="outlined" 
        onKeyDown = {(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
        onChange = {handleChange}
        
        />
        
          { <List>
            <Box
              sx={{
                mt : 1,
                width: 300,
                height: 300,
                //backgroundColor: 'primary.dark',
                //'&:hover': {
                //backgroundColor: 'primary.main',
                //opacity: [0.9, 0.8, 0.7],
              //}
              }}>
                <div>
                <TransitionGroup 
                component="div" 
                style={{ listStyle: 'none', margin: 0, padding: 0 }}
                maxWidth = {800}
                maxHeight = {60}>
                  {inputValues.map((value, index) => (
                    <CSSTransition key={index} names ="list-item" timeout={300}>                       
                       <div>
                       <Card
                        title = {value}
                        minWidth = {800}
                        minHeight = {50}
                        maxWidth = {800} 
                        maxHeight = {50}
                        contracted = {true}
                      ></Card>
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
                </div>
              </Box>
          </List> }
        
        

    </div>
  );
}

export default TextInput