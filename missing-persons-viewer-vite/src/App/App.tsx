// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ScrollRestoration, useLoaderData } from 'react-router-dom';

import { Grid } from 'src/shared/components/Layout';
import missingPersons from 'src/shared/data/missing_persons.json';
import { Action, MissingPerson, MissingPersonsArray } from 'src/shared/types';
import { paginate } from 'src/shared/utils';

import { Frontmatter, Header } from './components';
import { MissingPersons } from './pages/MissingPersons';

export const loader = ({ request }: Action) => {
  const pageSize = 50;
  const url = new URL(request.url);

  const showOnlyMatching = url.searchParams.get('showOnlyMatching') === 'true';

  const page = url.searchParams.get('page');
  const currentPage = Number(page) || 1;

  const missingPersonsList: MissingPersonsArray = Object.values(missingPersons)
    .filter((missingPerson: MissingPerson) =>
      // Filter out missing persons that don't have any matches, if the user has toggled accordingly
      showOnlyMatching
        ? missingPerson.MatchedUnidentified &&
          missingPerson.MatchedUnidentified.length > 0
        : true,
    )
    .sort((a: MissingPerson, b: MissingPerson) => {
      const aName = a.Name.toLowerCase();
      const bName = b.Name.toLowerCase();

      if (aName < bName) {
        return -1;
      }

      if (aName > bName) {
        return 1;
      }

      return 0;
    });

  const pageData = paginate<MissingPersonsArray>(
    missingPersonsList,
    pageSize,
    currentPage,
  );

  return { currentPage, pageData, pageSize };
};

export const App = () => {
  const { currentPage, pageData, pageSize } = useLoaderData() as {
    currentPage: number;
    pageData: MissingPersonsArray;
    pageSize: number;
  };

  return (
    <Grid css={{ padding: '1rem', gap: '1rem' }}>
      {/* Reset scroll position on page change */}
      <ScrollRestoration />
      <Header />
      <Frontmatter />

      <MissingPersons
        currentPage={currentPage}
        pageData={pageData}
        pageSize={pageSize}
      />
    </Grid>
  );
};
