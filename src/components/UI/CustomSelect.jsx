import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { red, pink, purple } from '@mui/material/colors';

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
                <InputLabel sx={{ color: red.A700 }}>{label}</InputLabel>
                <Select
                    value={internalValue}
                    label={label}
                    onChange={handleChange}
                    sx={{color: red.A700}}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: 'var(--tg-theme-bg-color)'//pink[50], // Sets the dropdown background color
                            }
                        },
                        sx: {
                            '&& .MuiMenuItem-root': { // Stronger specificity for default style
                                color: red.A700, // Text color for each item
                                backgroundColor: 'transparent', // Override default background color
                                '&:hover': {
                                    backgroundColor: pink[100], // Background color for items on hover
                                },
                                '&.Mui-selected': {
                                    backgroundColor: pink[100], // Background color for the selected item
                                    color: red.A700,
                                },
                                '&.Mui-focusVisible': {
                                    backgroundColor: pink[100], // Background color for the focused item
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
