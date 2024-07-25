import React, { useEffect, useState } from "react";
import { Select, MenuItem, Stack, FormControl, InputLabel, OutlinedInput, SvgIcon } from "@mui/material";
import { useProjects } from "../../context/ProjectsContext";
import { useTranslation } from 'react-i18next';
import { ArrowDropDown } from "@mui/icons-material";

function Sorting({ selectedType, setSelectedType }) {
    const { getTypes } = useProjects();
    const { t, i18n } = useTranslation();
    const [types, setTypes] = useState([]);

    useEffect(() => {
        async function fetchTypes() {
            const typesData = await getTypes();
            setTypes(typesData);
        }
        fetchTypes();
    }, [getTypes]);

    const handleChange = (event) => {
        if (event.target.value === "") {
            setSelectedType(null);
            return;
        }
        setSelectedType(event.target.value);
    };

    return (
        <Stack direction="row" spacing={2}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel htmlFor="outlined-select"
                    sx={{
                        color: "#ff5859",
                        '&.Mui-focused': {
                            color: "#b30000"
                        },
                    }}
                >
                    {t('projects.sorting.title')}
                </InputLabel>
                <Select
                    value={selectedType || ""}
                    onChange={handleChange}
                    input={<OutlinedInput id="outlined-select" label={t('projects.sorting.title')} />}
                    IconComponent={
                        (props) => (
                            <SvgIcon {...props} >
                                <ArrowDropDown sx={{ color: "#ff5859" }} />
                            </SvgIcon>
                        )
                    }
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
                    <MenuItem value="">
                        <em>
                            {t('projects.sorting.all')}
                        </em>
                    </MenuItem>
                    {types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {i18n.language === 'fr' ? type.name.fr : type.name.en}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
}

export default Sorting;
