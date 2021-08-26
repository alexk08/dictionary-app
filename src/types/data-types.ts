interface Pronunciation {
  adjective?: string;
  adverb?: string;
  all?: string;
  article?: string;
  conjunction?: string;
  interjection?: string;
  noun?: string;
  preposition?: string;
  pronoun?: string;
  verb?: string;
}

type PronunciationType = Pronunciation | string | undefined;

interface Definition {
  definition?: string;
  partOfSpeech?: string;
}

interface FoundWords {
  query: {
    limit: string;
    page: number;
  };
  results: {
    data: string[];
    length: number;
  };
}

interface InputWordData {
  frequency?: number;
  pronunciation: PronunciationType;
  results?: Array<{
    also?: string[];
    antonyms?: string[];
    attribute?: string[];
    cause?: string[];
    definition?: string;
    derivation?: string[];
    entails?: string[];
    examples?: string[];
    hasCategories?: string[];
    hasInstances?: string[];
    hasMembers?: string[];
    hasParts?: string[];
    hasSubstances?: string[];
    hasTypes?: string[];
    hasUsages?: string[];
    inCategory?: string[];
    inRegion?: string[];
    instanceOf?: string[];
    memberOf?: string[];
    partOfSpeech?: string;
    pertainsTo?: string[];
    regionOf?: string[];
    similarTo?: string[];
    substanceOf?: string[];
    synonyms?: string[];
    typeOf?: string[];
    usageOf?: string[];
  }>;
  syllables?: { count: number; list: string[] };
  word: string;
}

interface PureWordData {
  pronunciation: PronunciationType;
  name: string;
  mainInfo?: Definition[];
}

interface WordDataWithPropStarred extends PureWordData {
  isWordStarred: boolean;
}

interface SortIndexes {
  oldIndex: number;
  newIndex: number;
}

export enum ErrorValue {
  noError,
  net,
  emptyResponse
}

export type {
  FoundWords,
  PureWordData,
  InputWordData,
  WordDataWithPropStarred,
  PronunciationType,
  Definition,
  SortIndexes
};
