import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import {theme, themestate} from '../../styles/theme'; //new


const CustomSelect = ({
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
                <InputLabel sx={{ color: theme[themestate].textfaded }}>{label}</InputLabel>
                <Select
                    value={internalValue}
                    label={label}
                    onChange={handleChange}
                    sx={{color: theme[themestate].text}}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: 'var(--tg-theme-bg-color)'//pink[50], // Sets the dropdown background color
                            }
                        },
                        sx: {
                            '&& .MuiMenuItem-root': { // Stronger specificity for default style
                                color: theme[themestate].text, // Text color for each item
                                backgroundColor: 'transparent', // Override default background color
                                '&:hover': {
                                    backgroundColor: theme[themestate].hover, // Background color for items on hover
                                },
                                '&.Mui-selected': {
                                    backgroundColor: theme[themestate].hover, // Background color for the selected item
                                    color: theme[themestate].text,
                                },
                                '&.Mui-focusVisible': {
                                    backgroundColor: theme[themestate].hover, // Background color for the focused item
                                }
                            },
                        }
                    }}
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
