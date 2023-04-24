import { Semibold } from 'src/shared/components/Typography';
import metadata from 'src/shared/data/meta.json';

export const Header = () => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(metadata.updated_at));
  const latestDataUpdated = formattedDate || '2021-09-01';

  return (
    <header>
      <h1>RCMP Missing Persons Database - Entry Matching Tool</h1>

      <Semibold>Data Last Updated: {latestDataUpdated}</Semibold>
    </header>
  );
};
