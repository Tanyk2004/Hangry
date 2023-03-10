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

interface Props {
  functionToCall: any;
  setClicked?: any;
  sustainable?: boolean;
  alternative?: string;
  inputValue: string;
  setInputValue: any;
  inputValues: string[];
  setInputValues: any;
}

function TextInput(props: Props) {




  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).value !== '') {


      props.functionToCall(props.inputValue);

      console.log(props.inputValue);
      e.preventDefault();


      props.setInputValue('');

    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setInputValue((e.target as HTMLInputElement).value);
  };


  return (
    <div>
      <TextField
        id="outlined-basic"
        sx={{
          width: { md: 800 },
          "& .MuiInputBase-root": {
            height: 55,
            background: 'white'
          },

          boxShadow: 10,
          textAlign: 'center'
        }}

        label="Add an Item To Your Shopping List"
        value={props.inputValue}
        variant="filled"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
        onChange={handleChange}

      />

      {<List>
        <Box
          sx={{
            mt: 1,
            width: 300,
            height: 300,
          }}>
          <div>
            <TransitionGroup
              component="div"
              style={{ listStyle: 'none', margin: 0, padding: 0 }}
              maxWidth={800}
              maxHeight={60}
            >
              {props.inputValues.map((value, index) => (
                <CSSTransition key={index} names="list-item" timeout={300}>
                  <Card
                    setClicked={props.setClicked}
                    title={value}
                    minWidth={800}
                    minHeight={55}
                    maxWidth={800}
                    maxHeight={55}
                    contracted={true}
                    sustainable={props.sustainable} //input this from backend
                    alternative={props.alternative} //input this from backend

                  ></Card>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </Box>
      </List>}



    </div>
  );
}

export default TextInput