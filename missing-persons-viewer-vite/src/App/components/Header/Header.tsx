import { Semibold } from 'src/shared/components/Typography';

export const Header = () => {
  const latestDataUpdated = '2021-09-01';

  return (
    <header>
      <h1>RCMP Missing Persons Database - Entry Matching Tool</h1>

      <Semibold>Data Last Updated: {latestDataUpdated}</Semibold>
    </header>
  );
};
