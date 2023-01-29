import { React } from 'react';
import { PersonHeader } from './PersonHeader';
import { Grid, Stack, Typography, Card, Button, Box } from '@mui/material';

export function MissingRemainsSection(props) {
    function noMatchesCard() {
        return (
            <Card sx={{ p: 2 }}>
                <Typography variant='h6' align="center" color="info.dark">
                    No Records Found
                </Typography>
            </Card>
        )
    }

    return (
        <Grid xs={5}>

            <Typography variant='h4' align="center" color="info.dark">
                Missing Persons Records
            </Typography>

            <Box sx={{ maxHeight: 600, overflow: "scroll" }}>

                <Stack spacing={2} p={2}>

                    {props.person_list.length === 0 ? noMatchesCard() : <div />}

                    {props.person_list.map((entry) => (
                        <Card sx={{ p: 2 }} key={entry.PersonID}>
                            <Grid container>
                                <Grid item xs={12} sx={{ p: 2 }}>
                                    <PersonHeader person={entry} />
                                </Grid>
                            </Grid>
                        </Card>

                    ))}

                </Stack>
            </Box>

        </Grid >
    );
}