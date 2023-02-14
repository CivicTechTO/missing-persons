import { useLoaderData } from 'react-router-dom';

import { Grid } from 'src/shared/components/Layout';
import missingPersons from 'src/shared/data/missing_persons.json';
import { Action, MissingPerson } from 'src/shared/types';

export const loader = ({ params }: Action) => {
  const { caseNumber } = params;
  const caseRef = `Case reference: ${caseNumber}`;

  const missingPerson = Object.values(missingPersons).find(
    (missingPerson) => missingPerson.CaseRef === caseRef,
  );

  return { missingPerson };
};

export const UnidentifiedPersons = () => {
  const { missingPerson } = useLoaderData() as { missingPerson: MissingPerson };
  const {
    'Age at disappearance': ageAtDisappearance,
    Build: build,
    CaseDesc: caseDesc,
    CaseRef: caseRef,
    CaseURL: caseURL,
    Complexion: complexion,
    'Eye colour': eyeColour,
    Gender: gender,
    Hair: hair,
    Height: height,
    Images: images,
    MatchedUnidentified: matchedUnidentified,
    'Missing since': missingSince,
    Name: name,
    PersonID: personID,
    Teeth: teeth,
    Weight: weight,
    'Year of birth': yearOfBirth,
  } = missingPerson;

  return (
    <Grid as="section">
      <h2>Unidentified Persons</h2>
    </Grid>
  );
};
