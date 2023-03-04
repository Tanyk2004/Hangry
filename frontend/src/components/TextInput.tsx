import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';

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
        {/* <ul>
          {inputValues.map((value, index) => (
              <li key={index}>{value}</li>
          ))}
        </ul> */}
    </div>
  );
}

export default TextInput
