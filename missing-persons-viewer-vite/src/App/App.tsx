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
  const page = url.searchParams.get('page');
  const currentPage = Number(page) || 1;

  const missingPersonsList: MissingPersonsArray = Object.values(
    missingPersons,
  ).sort((a: MissingPerson, b: MissingPerson) => {
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
