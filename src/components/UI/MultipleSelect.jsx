import React, { useEffect, useState } from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Button } from "@mui/material";

const MultipleSelect = ({ label = '', options = [], initValue = [], onChange = () => {}, onChangeValid = () => {} }) => {
    const [values, setValues] = useState(initValue);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        onChange(values);
        onChangeValid(values.length > 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    const handleChange = (event) => {
        const { target: { value } } = event;
        setValues(typeof value === 'string' ? value.split(',') : value);
    };

    const handleClose = () => {
        setMenuOpen(false);
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
                    multiple
                    value={values}
                    onChange={handleChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={{
                        onClose: handleClose // Call handleClose when the menu is closed
                    }}
                    open={menuOpen}
                    onOpen={() => setMenuOpen(true)}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={values.indexOf(option) > -1} sx={{ width: "unset" }} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                    <MenuItem>
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Ok
                        </Button>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default MultipleSelect;
