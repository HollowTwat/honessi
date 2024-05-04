import React, {useState} from 'react';
import {TextField} from "@mui/material";
import {theme, themestate} from '../../styles/theme'; //new

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
        helperText: helpText,
        FormHelperTextProps: {
            sx: { color: theme[themestate].textfaded }
        },
        InputProps: {
            sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme[themestate].fieldoutlinesNF // Border color for unfocused states
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                   borderColor: theme[themestate].fieldoutlinesH, // Border color on hover
               },
               // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
               //    borderColor: 'green', // Border color when focused
               // },
               // '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
               //     borderColor: 'grey', // Border color when disabled
               // }
            }
        }
    };

    return (
        <div style={{width: '100%', marginTop: 10, marginBottom: 10}}>
            <TextField sx={{ 
            textarea: {color: theme[themestate].text} ,
            label: {color: theme[themestate].textfaded }              
            }}
                multiline {...textFieldProps}/>
        </div>
    );
};

export default MultilineInput;
