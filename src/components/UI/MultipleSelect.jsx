import React, { useEffect, useState } from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Button } from "@mui/material";

import {theme, themestate} from '../../styles/theme'; //new

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
                <InputLabel sx={{ color: theme[themestate].textfaded }}>{label}</InputLabel>
                <Select
                    multiple
                    sx={{color: theme[themestate].text}}
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
                        onClose: handleClose // Call handleClose when the menu is closed
                    }}
                    open={menuOpen}
                    onOpen={() => setMenuOpen(true)}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={values.indexOf(option) > -1} sx={{ color: theme[themestate].checkbox, width: 'unset' }} />
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
