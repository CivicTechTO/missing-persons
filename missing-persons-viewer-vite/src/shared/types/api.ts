export interface MissingPerson {
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

export type MissingPersonsArray = Array<MissingPerson>;
