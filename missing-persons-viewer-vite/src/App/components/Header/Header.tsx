import { Semibold } from 'src/shared/components/Typography';

export const Header = () => {
  return (
    <header>
      <h1>RCMP Missing Persons Database - Entry Matching Tool</h1>

      {/* TODO use actual timestamp data */}
      <Semibold>Data Last Updated: 2021-09-01</Semibold>
    </header>
  );
};
