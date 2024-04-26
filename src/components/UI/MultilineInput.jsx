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
