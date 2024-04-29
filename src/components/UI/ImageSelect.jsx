import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {theme, themestate} from '../../styles/theme'; //new
const ImageSelect = ({placeholder, value = '', images, onChange = () => {}}) => {

    const [image, setImage] = useState("");

    useEffect(() => {
        setImage(value);
    }, [value]);

    const handleChange = (event) => {
        setImage(event.target.value);
        onChange(event);
    };

    return (
        <div style={{
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
        }}>
            <FormControl fullWidth>
                <InputLabel sx={{ color: theme[themestate].textfaded }}>{placeholder}</InputLabel>
                <Select
                    value={image}
                    label={placeholder}
                    onChange={handleChange}
                    sx={{ color: theme[themestate].textfaded,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme[themestate].fieldoutlinesNF // Default border color
                        },
                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                        //     borderColor: 'green', // Border color on hover
                        // },
                        // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        //     borderColor: 'green', // Border color when focused
                        // },
                        // '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        //     borderColor: 'grey', // Border color when disabled
                        // } 
                        }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: 'var(--tg-theme-bg-color)'//pink[50], // Sets the dropdown background color
                            }
                        },
                        sx: {
                            '&& .MuiMenuItem-root': { // Stronger specificity for default style
                                color: theme[themestate].text,
                                '&:hover': {
                                    backgroundColor: theme[themestate].hover, // Background color for items on hover
                                },
                                '&.Mui-selected': {
                                    backgroundColor: theme[themestate].hover, // Background color for the selected item
                                    color: theme[themestate].text,
                                    '&:hover': {
                                        backgroundColor: theme[themestate].hover, // Background color for the selected item on hover
                                    }
                                }
                            }
                        },
                    }}
                >
                    {images.map((image, index) => (
                        <MenuItem key={index} value={image.label}>
                            <img src={image.url}
                                 alt={image.label}
                                 style={{
                                     width: '50%',
                                     marginLeft: '20',
                                     marginRight: 'auto',
                                 }}/>
                            {image.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ImageSelect;
