import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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
                <InputLabel>{placeholder}</InputLabel>
                <Select
                    value={image}
                    label={placeholder}
                    onChange={handleChange}
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