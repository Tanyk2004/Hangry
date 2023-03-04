import React from 'react'
import TextField from '@mui/material/TextField';


function TextInput() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <TextField id="outlined-basic" 
      label="Input Your Shopping List" 
      maxLength={50}
      variant="outlined" />
    </div>
  );
}

export default TextInput
