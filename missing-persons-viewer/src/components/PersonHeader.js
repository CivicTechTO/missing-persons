import React from 'react';
import { Card, Typography, Divider, Chip } from '@mui/material';

const removedAttributes = [
    'CaseRef',
    'CaseDesc',
    'CaseType',
    'CaseURL',
    'Name',
    'MatchedRemains',
    'MatchedUnidentified',
    'Images',
    'Case reference',
    'PersonID'
]

export function PersonHeader(props) {

    const person = props.person;

    return (
        <Card sx={{ p: 2, bgcolor: "info.main" }}>
            <Typography variant="h6" color="white" align="left">{person.Name}</Typography>
            <Divider sx={{ m: 1 }} />
            <Typography variant="p" color="white">{person.CaseDesc}</Typography>
            <Divider sx={{ m: 1 }} />
            {person.Images.map(imageURL => (
                <p> <a href={imageURL.replace('&thumb=small', '')}> Image </a> </p>
            ))}
            {Object.getOwnPropertyNames(person).filter((attribute) => !removedAttributes.includes(attribute)).map(attribute => (
                <p style={{ color: "white" }} > <b> {attribute}: </b> {person[attribute]}</p>
            ))}
        </Card>
    )
}