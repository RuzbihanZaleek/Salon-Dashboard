import { FormHelperText, styled, TextField } from '@mui/material';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';

function DateSelect(props) {

    const { name, value, label, error = null, onChange } = props

    const convertToDefaultPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                name={name}
                value={value}
                minDate={new Date()}
                onChange={date => onChange(convertToDefaultPara(name, date))}
                renderInput={(params) => <StyledTextfield variant='filled' {...params} {...(error && { error: true, helperText: error })} />}

            />
        </LocalizationProvider>
    );
}

export default DateSelect;

const StyledTextfield = styled(TextField)(() => ({
    fullWidth: "true",
    gridColumn: "span 1",
    width: "105%",

}))