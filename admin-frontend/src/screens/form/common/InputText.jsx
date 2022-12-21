import { TextField } from '@mui/material';
import React from 'react';

function InputText(props) {
    const { label, onBlur, onChange, value, name, error, helperText } = props

    return (
        <TextField
            fullWidth
            variant='filled'
            type="text"
            label={label}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            name={name}
            error={error}
            helperText={helperText}
            sx={{ gridColumn: "span 4", width: "50%" }}
        />
    );
}

export default InputText;