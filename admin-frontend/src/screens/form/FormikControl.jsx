import React from 'react';
import DateSelect from './common/DateSelect';
import InputText from './common/InputText';
import Selection from './common/Select';
import TimeSelect from './common/TimeSelect';


function FormikControl(props) {
    const { control, ...rest } = props
    console.log(props);
    switch (control) {
        case 'input':
            return <InputText {...rest} />
        case 'select':
            return <Selection {...rest} />
        case 'date':
            return <DateSelect {...rest} />
        case 'time':
            return <TimeSelect {...rest} />
        default:
            return null
    }
}

export default FormikControl;