import React, { useEffect, useState } from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Button } from "@mui/material";
import { pink, purple, red } from '@mui/material/colors';

const MultipleSelect = ({ label = '', options = [], initValue = [], onChange = () => {}, onChangeValid = () => {} }) => {
    const [values, setValues] = useState(initValue);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        onChange(values);
        onChangeValid(values.length > 0);
    }, [values, onChange, onChangeValid]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setValues(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
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
                <InputLabel sx={{ color: red.A700 }}>{label}</InputLabel>
                <Select
                    multiple
                    sx={{color: red.A700}}
                    value={values}
                    onChange={handleChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: 'var(--tg-theme-bg-color)'//pink[50], // Sets the dropdown background color
                            }
                        },
                        sx: {
                            '&& .MuiMenuItem-root': { // Stronger specificity for default style
                                color: red.A700,
                                '&:hover': {
                                    backgroundColor: purple[100], // Background color for items on hover
                                },
                                '&.Mui-selected': {
                                    backgroundColor: pink[100], // Background color for the selected item
                                    '&:hover': {
                                        backgroundColor: purple[100], // Background color for the selected item on hover
                                    }
                                }
                            }
                        },
                        onClose: handleClose // Call handleClose when the menu is closed
                    }}
                    open={menuOpen}
                    onOpen={() => setMenuOpen(true)}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={values.indexOf(option) > -1} sx={{ color: pink[600], width: 'unset' }} />
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
