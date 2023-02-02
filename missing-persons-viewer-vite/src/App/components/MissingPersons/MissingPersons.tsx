import { Grid } from 'src/shared/components/Layout';
import { Bold, CardText, Semibold } from 'src/shared/components/Typography';
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
  const missingPersonsList: Array<MissingPerson> = Object.values(missingPersons)
    .sort((a: MissingPerson, b: MissingPerson) => {
      const aName = a.Name.toLowerCase();
      const bName = b.Name.toLowerCase();

      if (aName < bName) {
        return -1;
      }

      if (aName > bName) {
        return 1;
      }

      return 0;
    })
    .slice(0, 10);

  return (
    <Grid css={{ gap: '1rem' }}>
      <h2>Missing Persons</h2>

      <Grid as="section" css={{ gap: '1rem' }}>
        {missingPersonsList.map((missingPerson) => {
          const {
            'Age at disappearance': ageAtDisappearance,
            Build: build,
            CaseDesc: caseDesc,
            CaseRef: caseRef,
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

          // console.log({ caseURL, images, matchedUnidentified });

          return (
            <Grid
              as="article"
              key={personID}
              css={{
                border: '1px solid black',
                padding: '1rem',
                width: 'max-content',
                height: 'max-content',
                gap: '1rem',
              }}
            >
              <Grid as="section" css={{ gap: '1rem' }}>
                <span>
                  <h3>{name}</h3>
                  <CardText as="a" href={caseURL}>
                    <Semibold>{caseRef}</Semibold>
                  </CardText>
                </span>

                {images && images.length > 0 && (
                  <img
                    src={images?.[0]}
                    alt={`A photo of ${name}`}
                    style={{
                      width: '250px',
                      height: '100%',
                      objectFit: 'cover',
                      justifySelf: 'center',
                    }}
                    loading="lazy"
                  />
                )}

                <span>
                  <CardText as="p">
                    <Bold>Missing Since:</Bold> {missingSince}
                  </CardText>
                  <CardText as="p">
                    <Bold>Age at disappearance:</Bold> {ageAtDisappearance}
                  </CardText>
                </span>

                <CardText as="p">{caseDesc}</CardText>
              </Grid>

              <section>
                <h4>Details</h4>

                <CardText as="p">
                  <Bold>Birth Year:</Bold> {yearOfBirth || 'N/A'}
                </CardText>

                <div>
                  <CardText as="p">
                    <Bold>Sex:</Bold> {gender || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Height:</Bold> {height || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Weight:</Bold> {weight || 'N/A'}
                  </CardText>
                </div>

                <div>
                  <CardText as="p">
                    <Bold>Build:</Bold> {build || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Complexion:</Bold> {complexion || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Eye Colour:</Bold> {eyeColour || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Hair Colour:</Bold> {hair || 'N/A'}
                  </CardText>
                  <CardText as="p">
                    <Bold>Teeth:</Bold> {teeth || 'N/A'}
                  </CardText>
                </div>
              </section>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
