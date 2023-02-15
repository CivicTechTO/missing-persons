import { useNavigate, useRouteError } from 'react-router-dom';
import { Grid } from 'src/shared/components/Layout';

export const Error = () => {
  const navigate = useNavigate();
  const { status, statusText } = useRouteError() as {
    status: number;
    statusText: string;
  };

  return (
    <Grid css={{ height: '100%', placeContent: 'center' }}>
      <Grid as="section" css={{ textAlign: 'center', gap: '1rem' }}>
        <h1>{status}</h1>
        <p>{statusText}</p>
        <button type="button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </Grid>
    </Grid>
  );
};
