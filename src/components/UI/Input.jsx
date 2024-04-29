import React, {useCallback, useState} from 'react';
import {TextField} from "@mui/material";
import {validate, validateError} from "../../validation/validation";

import {theme, themestate} from '../../styles/theme'; //new

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
        props,
        InputLabelProps: {
            style: { color: theme[themestate].textfaded } // Force label color red
        },
        InputProps: {
            sx: {
                'input': {
                    color: theme[themestate].text, // Apply to all input elements
                },
                "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: theme[themestate].textfaded,
                  },
                '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme[themestate].fieldoutlinesNF // Default border color
                        },
               //  '&:hover .MuiOutlinedInput-notchedOutline': {
               //              borderColor: 'green', // Border color on hover
               //          },
               //  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
               //              borderColor: 'green', // Border color when focused
               //          },
               // '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
               //              borderColor: 'grey', // Border color when disabled
               //          }
            }
        },
        FormHelperTextProps: {
            sx: { color: theme[themestate].textfaded }
        }
    };

    return (
        <div style={{width: '100%', marginTop: 10, marginBottom: 10}}>
            <TextField {...textFieldProps}/>
        </div>
    );
};

export default Input;
