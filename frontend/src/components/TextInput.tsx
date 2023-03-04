import React from 'react'
import TextField from '@mui/material/TextField';


function TextInput() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <TextField id="standard-basic" 
      label="Standard" 
      variant="standard" />
    </div>
  );
}

export default TextInput
