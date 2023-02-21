import { NavLink, useNavigate } from 'react-router-dom';

import { Flex, Grid } from 'src/shared/components/Layout';
import { Image } from 'src/shared/components/Media';
import { CardText } from 'src/shared/components/Typography';
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
  const navigate = useNavigate();

  return (
    <Grid css={{ gap: '1rem' }}>
      <h2>Missing Persons</h2>

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
