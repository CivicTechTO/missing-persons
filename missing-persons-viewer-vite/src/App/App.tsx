import { Grid } from 'src/shared/components/Layout';

import { Frontmatter, Header, MissingPersons } from './components';

export const App = () => {
  return (
    <Grid css={{ padding: '1rem', gap: '1rem' }}>
      <Header />
      <Frontmatter />

      <Grid as="main">
        <MissingPersons />
      </Grid>
    </Grid>
  );
};
