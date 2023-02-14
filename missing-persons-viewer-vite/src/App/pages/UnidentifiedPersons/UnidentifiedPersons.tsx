import { useLoaderData } from 'react-router-dom';

import { Grid } from 'src/shared/components/Layout';
import { Bold, Semibold, Text } from 'src/shared/components/Typography';
import missingPersons from 'src/shared/data/missing_persons.json';
import { Action, MissingPerson } from 'src/shared/types';
import { normalizeName } from 'src/shared/utils';

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
    Teeth: teeth,
    Weight: weight,
    'Year of birth': yearOfBirth,
  } = missingPerson;

  const normalizedName = normalizeName(name);

  return (
    <Grid as="section" css={{ gap: '1rem' }}>
      <Grid>
        <h2>{normalizedName}</h2>

        <Text as="a" href={caseURL}>
          <Semibold>{caseRef}</Semibold>
        </Text>
        <Text as="small">Missing since: {missingSince}</Text>
      </Grid>

      <img
        src={
          images && images?.length > 0
            ? images?.[0]
            : 'https://via.placeholder.com/250?text=Not+Available'
        }
        alt={`A photo of ${normalizedName}`}
        style={{
          width: '250px',
          height: '250px',
          objectFit: 'cover',
        }}
        loading="lazy"
      />

      <Text as="p">{caseDesc}</Text>

      <Grid as="section" css={{ gap: '1rem' }}>
        <h4>Details</h4>

        <div>
          <Text as="p">
            <Bold>Age at disappearance:</Bold> {ageAtDisappearance}
          </Text>
          <Text as="p">
            <Bold>Birth Year:</Bold> {yearOfBirth || 'N/A'}
          </Text>
        </div>

        <div>
          <Text as="p">
            <Bold>Sex:</Bold> {gender || 'N/A'}
          </Text>
          <Text as="p">
            <Bold>Height:</Bold> {height || 'N/A'}
          </Text>
          <Text as="p">
            <Bold>Weight:</Bold> {weight || 'N/A'}
          </Text>
        </div>

        <div>
          <Text as="p">
            <Bold>Build:</Bold> {build || 'N/A'}
          </Text>
          <Text as="p">
            <Bold>Complexion:</Bold> {complexion || 'N/A'}
          </Text>
          <Text as="p">
            <Bold>Eye Colour:</Bold> {eyeColour || 'N/A'}
          </Text>
          <Text as="p">
            <Bold>Hair Colour:</Bold> {hair || 'N/A'}
          </Text>
          <Text as="p">
            <Bold>Teeth:</Bold> {teeth || 'N/A'}
          </Text>
        </div>
      </Grid>
    </Grid>
  );
};
