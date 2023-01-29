import { Button, Card, Grid, Box, Typography } from "@mui/material";
import * as React from 'react';

const PersonStructure = ({ person }) => (
  <Card sx={{ p: 2, bgcolor: "info.main" }}>
      <Typography variant="h6" color="white">{person.Name}</Typography>
  </Card>
);

const FilterButton = ({ person }) => (
  // button to filter by this person
    <Button variant="contained" size="small" sx={{ bgcolor: "info.main", color: "white", align:"center"}}>Filter Remains By This Persons Details</Button>
);

//what is the difference between this and a functional component?
export const PersonView = ({ person }) => (    
    
    <Card sx={{ p: 2 }}>  
      
      <Grid container>        
        
        <Grid item xs={12} sx={{p:2}}>
          <PersonStructure person={person} />
        </Grid>

        {Object.entries(person).map(([attrName, attrValue]) => [                              
          
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: 'bold', textAlign:'right'}}>{attrName}:</Typography>
          </Grid>,

          <Grid item xs={9}>
            <Box sx={{pl:1}}>
              <Typography sx={{textAlign:'left'}} >{attrValue}</Typography>
            </Box>            
          </Grid>          

        ])}

      </Grid>
      
      <Grid container sx={{p:2}} justifyContent="center">
        <FilterButton person={person} />
      </Grid>

    </Card>
);
