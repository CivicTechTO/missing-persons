import { ScrollRestoration, useLoaderData } from 'react-router-dom';

import { Flex, Grid } from 'src/shared/components/Layout';
import { Bold, Semibold, Text } from 'src/shared/components/Typography';
import missingPersons from 'src/shared/data/missing_persons.json';
import unidentifiedPersons from 'src/shared/data/unidentified_persons.json';
import {
  Action,
  Maybe,
  MissingPerson,
  UnidentifiedPersonsArray,
} from 'src/shared/types';
import { normalizeName } from 'src/shared/utils';

export const loader = ({ params }: Action) => {
  const { caseNumber } = params;
  const caseRef = `Case reference: ${caseNumber}`;

  // Grab missing person data from dataset by case reference
  const missingPerson: Maybe<MissingPerson> = Object.values(
    missingPersons,
  ).find((missingPerson) => missingPerson.CaseRef === caseRef);

  // Grab unidentified person data from dataset by case reference
  const matchingUnidentifiedPersons = Object.entries(unidentifiedPersons)
    .filter(([key]) => {
      return missingPerson?.MatchedUnidentified?.includes(key);
    })
    .map(([, unidentifiedPerson]) => unidentifiedPerson);

  return { missingPerson, matchingUnidentifiedPersons };
};

export const UnidentifiedPersons = () => {
  const { missingPerson, matchingUnidentifiedPersons } = useLoaderData() as {
    missingPerson: MissingPerson;
    matchingUnidentifiedPersons: UnidentifiedPersonsArray;
  };
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
    'Missing since': missingSince,
    Name: name,
    Teeth: teeth,
    Weight: weight,
    'Year of birth': yearOfBirth,
  } = missingPerson;

  const normalizedName = normalizeName(name);

  return (
    <>
      {/* Reset scroll position when navigating to page */}
      <ScrollRestoration />
      <Grid
        as="main"
        css={{
          gap: '4rem',
          padding: '1rem',
          gridTemplateColumns: 'repeat(autofit, minmax(500px, 1fr))',
          justifyContent: 'start',
        }}
      >
        <Grid
          css={{
            gap: '1rem',
            gridColumn: '1 / span 1',
            width: '500px',
            height: 'max-content',
            position: 'sticky',
            top: '1rem',
          }}
        >
          <Grid as="section">
            <h1>{normalizedName}</h1>

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

          <Text as="p" css={{ maxWidth: '70ch' }}>
            {caseDesc}
          </Text>

          <Grid as="article" css={{ gap: '1rem' }}>
            <Text as="h2">Details</Text>

            <section>
              <Text as="p">
                <Bold>Age at disappearance:</Bold> {ageAtDisappearance}
              </Text>
              <Text as="p">
                <Bold>Birth Year:</Bold> {yearOfBirth || 'N/A'}
              </Text>
            </section>

            <section>
              <Text as="p">
                <Bold>Sex:</Bold> {gender || 'N/A'}
              </Text>
              <Text as="p">
                <Bold>Height:</Bold> {height || 'N/A'}
              </Text>
              <Text as="p">
                <Bold>Weight:</Bold> {weight || 'N/A'}
              </Text>
            </section>

            <section>
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
            </section>
          </Grid>
        </Grid>

        <Grid
          css={{
            gridColumn: '2 / span 1',
            width: '500px',
            height: 'max-content',
            gap: '1rem',
          }}
        >
          <Text as="h2">Matching Unidentified Persons</Text>
          {matchingUnidentifiedPersons.length > 0 ? (
            <Flex
              as="section"
              css={{ gap: '2rem', flexDirection: 'column', flexWrap: 'nowrap' }}
            >
              {matchingUnidentifiedPersons.map((unidentifiedPerson) => {
                const {
                  CaseDesc: caseDesc,
                  CaseRef: caseRef,
                  CaseURL: caseUrl,
                  'Discovered on': discoveredOn,
                  'Est. age': estimatedAge,
                  Gender: gender,
                  Images: images,
                } = unidentifiedPerson;

                return (
                  <Grid
                    key={caseRef}
                    as="a"
                    href={caseUrl}
                    css={{
                      border: '1px solid black',
                      padding: '1rem',
                      gap: '1rem',
                      textDecoration: 'none',
                      color: 'black',

                      '&:hover': {
                        backgroundColor: '#F6F4F3',
                      },
                    }}
                  >
                    <Text as="h4">{caseRef}</Text>

                    {/* TODO make image component that falls back to placeholder */}
                    {/* TODO make THIS image show a cat in place of human remains (for developer sanity) */}
                    <img
                      src={
                        import.meta.env.PROD && images?.length > 0
                          ? images[0]
                          : 'https://via.placeholder.com/250?text=Not+Available'
                      }
                      alt=""
                      style={{
                        width: '250px',
                        height: '250px',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />

                    <Grid>
                      <Text>
                        <Bold>Estimated age:</Bold> {estimatedAge}
                      </Text>

                      <Text>
                        <Bold>Discovered on:</Bold> {discoveredOn}
                      </Text>

                      <Text>
                        <Bold>Gender:</Bold> {gender}
                      </Text>
                    </Grid>

                    <Text css={{ maxWidth: '80ch' }}>{caseDesc}</Text>
                  </Grid>
                );
              })}
            </Flex>
          ) : (
            <Text as="p">No matches available</Text>
          )}
        </Grid>
      </Grid>
    </>
  );
};
