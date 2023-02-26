import { NavLink, useSearchParams } from 'react-router-dom';

import { Flex, Grid } from 'src/shared/components/Layout';
import { Image } from 'src/shared/components/Media';
import { CardText, Text } from 'src/shared/components/Typography';
import { MissingPersonsArray } from 'src/shared/types';
import { normalizeName } from 'src/shared/utils';

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
  const [, setSearchParams] = useSearchParams();

  return (
    <Grid css={{ gap: '1rem' }}>
      <h2>Missing Persons</h2>

      <section>
        <Text as="h3"> Filters:</Text>
        <Flex css={{ gap: '1rem' }}>
          <Flex as="label" css={{ gap: '1ch' }} htmlFor="showOnlyMatching">
            <input
              type="checkbox"
              name="showOnlyMatching"
              id="showOnlyMatching"
              onClick={() => {
                setSearchParams((previous) => {
                  const previousEntries = Object.fromEntries(previous);
                  const showOnlyMatching =
                    previousEntries.showOnlyMatching === 'true';

                  return {
                    ...previousEntries,
                    showOnlyMatching: String(!showOnlyMatching),
                  };
                });
              }}
            />
            Show only matching
          </Flex>
        </Flex>
      </section>

      <Flex as="section" css={{ gap: '2rem', flexWrap: 'wrap' }}>
        {pageData.map((missingPerson) => {
          const {
            CaseRef: caseRef,
            Images: images,
            Name: name,
            PersonID: personID,
          } = missingPerson;

          // Split case number from case reference
          const caseNumber = caseRef?.split(': ')[1];

          // Normalize name
          const normalizedName = normalizeName(name);

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
                    {normalizedName}
                  </CardText>
                </span>

                <Image
                  src={images?.[0]}
                  alt={`A photo of ${normalizedName}`}
                  css={{ justifySelf: 'center' }}
                />
              </Grid>
            </Grid>
          );
        })}
      </Flex>

      <Flex css={{ gap: '1rem', justifyContent: 'center' }}>
        {currentPage > 1 && (
          <button
            type="button"
            onClick={() => {
              setSearchParams((previous) => {
                const previousEntries = Object.fromEntries(previous);

                return {
                  ...previousEntries,
                  page: String(currentPage - 1),
                };
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
              setSearchParams((previous) => {
                const previousEntries = Object.fromEntries(previous);

                return {
                  ...previousEntries,
                  page: String(currentPage + 1),
                };
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
