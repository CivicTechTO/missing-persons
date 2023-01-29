import * as React from 'react';
import { Box, Divider, Typography, Button } from '@mui/material';

function Menu(props) {

    return (
        <Box sx={{ color: 'info.dark', m: 1 }} >
            <Typography align="left" color="black" sx={{ p: 1 }}>
                Attempt to find missing persons by matching them to
                the unidentified remains.
            </Typography>

            <Typography align="left" color="black" sx={{ p: 1 }}>
                Filter the list of unidentified remains by clicking
                on the red buttons.
            </Typography>

            <Divider sx={{ p: 1 }} />

            <Typography align="left" color="black" sx={{ p: 1 }}>
                Found a match? Reach out to the authorities.
            </Typography>

            <Typography align="left" color="error" sx={{ p: 1 }}>
                Don't call 911 if it's not an emergency!
            </Typography>

            <a href="https://www.rcmp-grc.gc.ca/cont/comment-eng.htm">
                <Button variant="contained" color="secondary">RCMP Contact Form</Button>
            </a>

            <br />
            <br />
            <Typography variant='body' align="left" color="black">
                This project is not affiliated with the RCMP.
            </Typography>

            <Divider sx={{ p: 1 }} />

            <Typography align="center" color="info.dark">
                Data Last Updated:
                <br /> {props.collectionDate}
            </Typography>

        </Box>
    );

}

export default Menu;