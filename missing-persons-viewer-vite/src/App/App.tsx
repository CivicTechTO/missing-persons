import { Outlet } from 'react-router-dom';

import { Grid } from 'src/shared/components/Layout';

import { Frontmatter, Header } from './components';

export const App = () => {
  return (
    <Grid css={{ padding: '1rem', gap: '1rem' }}>
      <Header />
      <Frontmatter />
      <Outlet />
    </Grid>
  );
};
