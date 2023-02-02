import { Grid } from 'src/shared/components';

import {
  Frontmatter,
  Header,
  MissingPersons,
  UnidentifiedPersons,
} from './components';

export const App = () => {
  return (
    <Grid>
      <Header />
      <Frontmatter />

      <Grid as="main">
        <MissingPersons />
        <UnidentifiedPersons />
      </Grid>
    </Grid>
  );
};
