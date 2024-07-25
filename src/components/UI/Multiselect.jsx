import React from 'react';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';

const CustomArrowIcon = (props) => {
    return (
        <SvgIcon {...props} sx={{ color: "#ff5859" }}> {/* Changez la couleur ici */}
            <ArrowDropDownIcon />
        </SvgIcon>
    );
};

const Multiselect = ({ options, label, selectedOptions, setSelectedOptions }) => {

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}> 
            <InputLabel htmlFor="outlined-multiselect"
                sx={{
                    color: "#ff5859",
                    '&.Mui-focused': {
                        color: "#b30000"
                    },
                }}
            >
                {label}
            </InputLabel>
            <Select
                multiple
                value={selectedOptions}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
                input={<OutlinedInput id="outlined-multiselect" label={label} />}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: "#c8e3e9",
                            color: "#0d1d21",
                        },
                    },
                }}
                sx={{
                    '& .MuiSelect-select': {
                        color: "#fff"
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#ff5859"
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#ff8080"
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#b30000"
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option} >
                        <Stack direction="row" alignItems="center">
                            <Checkbox
                                checked={selectedOptions.indexOf(option) > -1}
                                id={option}
                                sx={{
                                    color: "#ff5859",
                                    '&.Mui-checked': {
                                        color: "#ff5859"
                                    },
                                }}
                            />
                            <ListItemText primary={option} htmlFor={option} />
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Multiselect;
