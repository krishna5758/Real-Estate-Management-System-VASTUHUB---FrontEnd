import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box } from '@mui/material';

const propertyTypes = [
    { label: 'Flat', value: 'flat' },
    { label: 'Independent Houses', value: 'independentHouses' },
    { label: 'Builder Floors', value: 'builderFloors' },
    { label: 'Plot/Lands', value: 'plotLands' },
];

const Searchbar = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        city: '',
        area: '',
        type: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));

    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    return (
        <Box component="form" onSubmit={handleSearch} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        name="city"
                        value={searchParams.city}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Area"
                        variant="outlined"
                        fullWidth
                        name="area"
                        value={searchParams.area}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Type"
                        variant="outlined"
                        fullWidth
                        name="type"
                        value={searchParams.type}
                        onChange={handleChange}
                    >
                        {propertyTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))};
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary' fullWidth>
                        Search
                    </Button>

                </Grid>
            </Grid>

        </Box>
    );
};

export default Searchbar;