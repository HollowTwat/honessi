import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {theme, themestate} from '../../styles/theme'; //new

const CustomSelect = (
    {
        label = '',
        value = '',
        options = [],
        onChange = () => {},
        onChangeValid = () => {}
    }) => {

    const [internalValue, setInternalValue] = useState('');

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInternalValue(newValue);
        onChange(event);
        onChangeValid(true);
    };

    return (
        <div style={{
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
        }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    sx = {{ 
                        style: {color: theme[themestate].textfaded}
                    }}
                    value={internalValue}
                    label={label}
                    onChange={handleChange}
                >
                    {options.map((value, index) => (
                        <MenuItem key={index} value={value.text}>
                            {value.text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default CustomSelect;
