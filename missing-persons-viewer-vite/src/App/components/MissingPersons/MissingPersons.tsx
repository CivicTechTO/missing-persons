import { Grid } from 'src/shared/components';
import missingPersons from 'src/shared/data/missing_persons.json';

interface MissingPerson {
  'Age at disappearance'?: Array<string>;
  Build?: Array<string>;
  CaseDesc: string;
  CaseRef: string;
  CaseType: string;
  CaseURL: string;
  Complexion?: Array<string>;
  'Eye colour'?: Array<string>;
  Gender?: Array<string>;
  Hair?: Array<string>;
  Height?: Array<string>;
  Images?: Array<string>;
  MatchedUnidentified?: Array<string>;
  'Missing since': Array<string>;
  Name: string;
  PersonID: string;
  Teeth?: Array<string>;
  Weight?: Array<string>;
  'Year of birth': Array<string>;
}

export const MissingPersons = () => {
  const missingPersonsList: Array<MissingPerson> =
    Object.values(missingPersons);

  return (
    <Grid as="section">
      <h2>Missing Persons</h2>

      {missingPersonsList.map((missingPerson) => {
        const {
          'Age at disappearance': ageAtDisappearance,
          Build: build,
          CaseDesc: caseDesc,
          CaseRef: caseRef,
          CaseType: caseType,
          CaseURL: caseURL,
          Complexion: complexion,
          'Eye colour': eyeColour,
          Gender: gender,
          Hair: hair,
          Height: height,
          Images: images,
          MatchedUnidentified: matchedUnidentified,
          'Missing since': missingSince,
          Name: name,
          PersonID: personID,
          Teeth: teeth,
          Weight: weight,
          'Year of birth': yearOfBirth,
        } = missingPerson;

        return (
          <article key={personID}>
            <section>
              <h3>{name}</h3>
              {caseRef}

              <img
                src="https://thispersondoesnotexist.com/image"
                alt={`A photo of ${name}`}
                style={{ width: '300px', height: '300px' }}
              />
              <p>Missing Since: {missingSince}</p>
              <p>Age at disappearance: {ageAtDisappearance}</p>
              <p>{caseDesc}</p>
            </section>

            <section>
              <h4>Details</h4>

              <p>Birth Year: {yearOfBirth || 'N/A'}</p>

              <div>
                <p>Sex: {gender || 'N/A'}</p>
                <p>Height: {height || 'N/A'}</p>
                <p>Weight: {weight || 'N/A'}</p>
              </div>

              <div>
                <p>Build: {build || 'N/A'}</p>
                <p>Complexion: {complexion || 'N/A'}</p>
                <p>Eye Colour: {eyeColour || 'N/A'}</p>
                <p>Hair Colour: {hair || 'N/A'}</p>
                <p>Teeth: {teeth || 'N/A'}</p>
              </div>
            </section>
          </article>
        );
      })}
    </Grid>
  );
};
