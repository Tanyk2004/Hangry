import React from 'react'
import TextField from '@mui/material/TextField';
import { shadows } from '@mui/system';
import { spacing } from '@mui/system';

function TextInput() {
  const [value, setValue] = React.useState('');
  const inputLabelProps = {
    style: {
      textAlign: 'left',
    },
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
        pl: '10',
        textAlign: 'center'
        }}
        
        
        label ="Input Your Shopping List" 
        variant="outlined" />
    </div>
  );
}

export default TextInput
