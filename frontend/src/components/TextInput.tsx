import React from 'react'
import TextField from '@mui/material/TextField';


function TextInput() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <TextField id="outlined-basic" 
      sx={{
        width: { sm: 800, md: 10 },
        "& .MuiInputBase-root": {
            height: 80
        }
    }}
      label="Input Your Shopping List" 
      variant="outlined" />
    </div>
  );
}

export default TextInput
