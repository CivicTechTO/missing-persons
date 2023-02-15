import { Grid } from 'src/shared/components/Layout';
import { Semibold } from 'src/shared/components/Typography';

export const Frontmatter = () => {
  return (
    <Grid css={{ gap: '1rem', width: '80ch' }}>
      <Grid as="article" css={{ gap: '1rem' }}>
        <p>
          This application facilitates the identification of missing persons by
          comparing physical characteristics and personal information with
          unidentified remains.
        </p>

        <p>
          This application streamlines the identification process, reducing
          manual cross-referencing and time-consuming searches.
        </p>
      </Grid>

      <article>
        <p>
          Found a match?{' '}
          <a href="https://www.rcmp-grc.gc.ca/cont/comment-eng.htm">
            <Semibold>Reach out to the authorities.</Semibold>
          </a>
        </p>

        <small>This project is not affiliated with the RCMP.</small>
      </article>
    </Grid>
  );
};
