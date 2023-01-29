import { React, useState } from 'react';
import { Box, Stack } from '@mui/material';
import PersonView from './PersonView';

function UnidentifiedSection(props) {

    const fullList = JSON.parse(props.json);

    const [personsList, setMissingPersons] = useState(fullList);

    function filterMissingPersonsByName(name) {
        var filteredList = fullList.filter( personsList => personsList.Name.includes(name));
        setMissingPersons(filteredList);
    }

    return (
        <Box sx={{ p: 2 }}>
            <Stack spacing={2} p={2}>        
            { personsList.map((person) => (<PersonView person={person} />)) }
            </Stack>
        </Box>
    );
}

export default UnidentifiedSection;