import React, {useState} from 'react';
import {TextField} from "@mui/material";

const MultilineInput = ({label = '', helpText = '', initValue = [], onChange = () => {}}) => {

    const [value, setValue] = useState(initValue);

    const handleChange = (e) => {

        let newValue = e.target.value;
        const splitValues = newValue.split(', ').map(word => word.replace(/\s+/g, ' ').toUpperCase());
        onChange(splitValues.map(word => word.trim()))
        setValue(splitValues)
    };

    const textFieldProps = {
        label: label,
        variant: "outlined",
        value: value.join(', '),
        onChange: handleChange,
        helperText: helpText
    };

    return (
        <div style={{width: '100%', marginTop: 10, marginBottom: 10}}>
            <TextField multiline {...textFieldProps}/>
        </div>
    );
};

export default MultilineInput;