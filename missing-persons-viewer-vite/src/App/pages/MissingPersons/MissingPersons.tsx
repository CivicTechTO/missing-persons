import { NavLink, useNavigate } from 'react-router-dom';

import { Flex, Grid } from 'src/shared/components/Layout';
import { Bold, CardText, Semibold } from 'src/shared/components/Typography';
import { MissingPersonsArray } from 'src/shared/types';

interface MissingPersonsProps {
  currentPage: number;
  pageData: MissingPersonsArray;
  pageSize: number;
}

export const MissingPersons = ({
  currentPage,
  pageData,
  pageSize,
}: MissingPersonsProps) => {
  const navigate = useNavigate();

  return (
    <Grid css={{ gap: '1rem' }}>
      <h2>Missing Persons</h2>

      <Flex as="section" css={{ gap: '2rem', flexWrap: 'wrap' }}>
        {pageData.map((missingPerson) => {
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
            // MatchedUnidentified: matchedUnidentified,
            'Missing since': missingSince,
            Name: name,
            PersonID: personID,
            Teeth: teeth,
            Weight: weight,
            'Year of birth': yearOfBirth,
          } = missingPerson;

          // Split case number from case reference
          const caseNumber = caseRef?.split(': ')[1];

          return (
            <Grid
              as={NavLink}
              key={personID}
              to={`/missing/${caseNumber}`}
              css={{
                border: '1px solid black',
                padding: '1rem',
                width: 'max-content',
                height: 'max-content',
                gap: '1rem',
                textDecoration: 'none',

                '&:hover': {
                  backgroundColor: '#F6F4F3',
                },
              }}
            >
              <Grid as="section" css={{ gap: '1rem' }}>
                <span>
                  <CardText as="h3" css={{ color: 'black' }}>
                    {name}
                  </CardText>
                  {/* <CardText as="a" href={caseURL}>
                    <Semibold>{caseRef}</Semibold>
                  </CardText> */}
                </span>

                <img
                  src={
                    images && images?.length > 0
                      ? images?.[0]
                      : 'https://via.placeholder.com/250?text=Not+Available'
                  }
                  alt={`A photo of ${name}`}
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'cover',
                    justifySelf: 'center',
                  }}
                  loading="lazy"
                />

                {/* <span>
                  <CardText as="p">
                    <Bold>Missing Since:</Bold> {missingSince}
                  </CardText>
                  <CardText as="p">
                    <Bold>Age at disappearance:</Bold> {ageAtDisappearance}
                  </CardText>
                </span>

                <CardText as="p">{caseDesc}</CardText> */}
              </Grid>

              {/* <section>
                <h4>Details</h4>

                <CardText as="p">
                  <Bold>Birth Year:</Bold> {yearOfBirth || 'N/A'}
                </CardText>

                <div>
                  <CardText as="p">
                    <Bold>Sex:</Bold> {gender || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Height:</Bold> {height || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Weight:</Bold> {weight || 'N/A'}
                  </CardText>
                </div> */}
              {/*
                <div>
                  <CardText as="p">
                    <Bold>Build:</Bold> {build || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Complexion:</Bold> {complexion || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Eye Colour:</Bold> {eyeColour || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Hair Colour:</Bold> {hair || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Teeth:</Bold> {teeth || 'N/A'}
                  </CardText>
                </div>
              </section> */}
            </Grid>
          );
        })}
      </Flex>

      <Flex css={{ gap: '1rem', justifyContent: 'center' }}>
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => {
              navigate({
                search: `?page=${String(currentPage - 1)}`,
              });
            }}
          >
            Previous Page
          </button>
        )}
        {pageData.length === pageSize && (
          <button
            type="button"
            onClick={() => {
              navigate({
                search: `?page=${String(currentPage + 1)}`,
              });
            }}
          >
            Next Page
          </button>
        )}
      </Flex>
    </Grid>
  );
};
