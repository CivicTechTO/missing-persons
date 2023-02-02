import { React, useState } from "react";
//import { useState } from 'react'
// helmet gives access to head tags
import { Helmet } from "react-helmet";
import { Grid, Stack, Typography, Card, Button, Box } from "@mui/material";
import Title from "./components/Title";
import Menu from "./components/Menu";
//import { PersonList } from './components/PersonList';
import { MissingPersonsSection } from "./components/MissingPersonsSection";
import { PersonHeader } from "./components/PersonHeader";

// data
import missing_persons from "./data/missing_persons.json";
import unidentified_remains from "./data/unidentified_persons.json";
import mapping from "./data/mapping.json";
import { MissingRemainsSection } from "./components/MissingRemainsSection";

const missingList = Object.getOwnPropertyNames(missing_persons).map(function (
  e
) {
  return missing_persons[e];
});
console.log({ missingList });

function App() {
  /*
  // handle the unidentified remains list
  const [unidentifiedList, setUnidentified] = useState(unidentified_remains);

  function filterRemainsByName(name) {
      var filteredList = unidentified_remains.filter( remain => remain.MatchedNames.includes(name));
      setUnidentified(filteredList);
  }
  */
  const collectionDate = "2021-09-01";
  let [currentMissing, setCurrentMissing] = useState("");

  function filteredRemains() {
    if (currentMissing === "") {
      return [];
    }
    return currentMissing.MatchedUnidentified.map(
      (personID) => unidentified_remains[personID]
    );
  }

  return (
    <div className="App">
      <Helmet>
        <title>RCMP Missing Persons Database Tool</title>
        <meta
          name="description"
          content="This app will allow you to compare Missing Persons records to Unidentified Remains records from the RCMP Database containing both."
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>

      <Stack spacing={3} className="main-grid">
        <Title />

        <Grid container spacing={2}>
          <Grid xs={12} md={2}>
            <Menu collectionDate={collectionDate} />
          </Grid>

          <Grid container xs={12} md={10}>
            <MissingPersonsSection
              person_list={missingList}
              onSearch={setCurrentMissing}
            />

            <MissingRemainsSection person_list={filteredRemains()} />
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
}

export default App;
