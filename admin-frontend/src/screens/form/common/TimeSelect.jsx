import { styled, TextField } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';

function TimeSelect(props) {

    const { name, value, label, error = null, onChange, ...rest } = props

    const convertToDefaultPara = (name, value) => ({
        target: {
            name, value
        }
    })
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label={label}
                name={name}
                value={value}
                minTime={dayjs("2018-01-01T08:00")}
                maxTime={dayjs("2025-01-01T18:00")}
                //minTime={dayjs(new Date())}
                onChange={time => onChange(convertToDefaultPara(name, time))}
                renderInput={(params) => <StyledTextfield variant='filled' {...params} {...(error && { error: true, helperText: rest.helperText })} />}

            />
        </LocalizationProvider>
    );
}

export default TimeSelect;

const StyledTextfield = styled(TextField)(() => ({
    fullWidth: "true",
    gridColumn: "span 1",
    width: "105%"
}))