import { React } from 'react';
import { PersonHeader } from './PersonHeader';
import { Grid, Stack, Typography, Card, Button, Box } from '@mui/material';

export function MissingPersonsSection(props) {
    function handlePersonClick(person) {
        console.log(person);
        props.onSearch(person);
    }

    return (
        <Grid xs={5}>
            <Typography variant='h4' align="center" color="info.dark">
                Missing Persons Records
            </Typography>

            <Box sx={{ maxHeight: 600, overflow: "scroll" }}>

                <Stack spacing={2} p={2}>

                    {props.person_list.map((entry) => (

                        <Card sx={{ p: 2 }} key={entry.PersonID}>
                            <Grid container>
                                <Grid item xs={12} sx={{ p: 2 }}>
                                    <PersonHeader person={entry} />
                                </Grid>
                            </Grid>

                            <Grid container sx={{ p: 2 }} justifyContent="center">
                                <Button
                                    onClick={() => handlePersonClick(entry)}
                                    variant="contained"
                                    size="small"
                                    sx={{ bgcolor: "error.light", color: "white", align: "center" }}>
                                    Filter Remains By This Person's Details
                                </Button>
                            </Grid>
                        </Card>

                    ))}

                </Stack>
            </Box>

        </Grid >
    );
}