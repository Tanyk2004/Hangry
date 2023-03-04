import React from 'react'
import TextField from '@mui/material/TextField';


function TextInput() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <TextField id="standard-basic" 
      label="Input Your Shopping List" 
      variant="standard" />
    </div>
  );
}

export default TextInput
