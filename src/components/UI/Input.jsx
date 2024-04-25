import React, {useCallback, useState} from 'react';
import {TextField} from "@mui/material";
import {validate, validateError} from "../../validation/validation";

import {theme, themestate} from '../../styles/theme' //new

const Input = ({label, value, onChangeValid = () => {}, validationType = 'default', helpText = '', onChange = () => {}, disabled = false, required = false, ...props}) => {

    const [isValid, setValid] = useState(true);

    const handleChange = useCallback((e) => {
        let newValue = e.target.value;

        let resultValidation = validate(newValue, validationType)

        if (validationType === 'numeric' && resultValidation) {
            newValue = newValue.replace(/^0+/, '');
        }

        setValid(resultValidation);
        onChange(newValue);
        onChangeValid(resultValidation);

    }, [validationType, onChange, onChangeValid]);

    const textFieldProps = {
        error: !isValid,
        disabled: disabled,
        required: required,
        label: label,
        variant: "outlined",
        value: value,
        onChange: handleChange,
        helperText: !isValid ? validateError[validationType] : helpText, onChangeValid,
        props
    };

    return (
        <div style={{width: '100%', marginTop: 10, marginBottom: 10}}>
            <TextField sx={{ 
            input: { color: theme[themestate].text },
            style: { color: 'red' }              
            }} {...textFieldProps}/>
        </div>
    );
};

export default Input;
