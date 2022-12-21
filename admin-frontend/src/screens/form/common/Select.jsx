import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Selection(props) {
    const { label, name, value, options, onChange, onBlur, ...rest } = props
    console.log(props);

    return (

        <FormControl
            variant='filled'
            fullWidth
            error={rest.error}
            helperText={rest.helperText}
            sx={{ gridColumn: "span 4", width: "50%" }}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                fullWidth
                variant='filled'
                name={name}
                value={value}
                onChange={onChange}
            >
                <MenuItem value=""></MenuItem>
                {
                    options.map(option => (
                        <MenuItem key={option.id} value={option.title}>
                            {option.title}
                        </MenuItem>
                    ))
                }
            </Select>
            <div>
                <p className="hText">{rest.error}</p>
                <p className="hText">{rest.helperText}</p>
            </div>
        </FormControl>

    );
}

export default Selection;