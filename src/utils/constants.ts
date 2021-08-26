//* Регульрное выражение для поиска слов по первым буквам
// const REGEXP = /^word[\w]*\b$/;
// const REGEXP_SCREEN = `^${value}[\\w]*\\b$`;
// const REGEXP_ENCODE = '%5Eword%5B%5Cw%5D*%5Cb%24'

const URL = {
  BASE: "https://wordsapiv1.p.rapidapi.com/words/",
  SEARCH_PATTERN: "?letterPattern=",
  SEARCH_OPTIONS: "&limit=10&hasDetails=definitions,synonyms,examples",
};

const HEADERS = {
  Accept: "application/json",
  "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  "x-rapidapi-key": "8c27159218mshe871e6abcfbf6a1p1244b4jsnd763ed26b693",
};

const PAGE_NAMES = ["Word Keeper", "Starred Words"];

const FILTERS = [
  "adjective",
  "adverb",
  "conjunction",
  "definite article",
  "interjection",
  "noun",
  "preposition",
  "pronoun",
  "verb",
];

const FILTER_ALL = "all";

const ROUTE = {
  ROOT: "/",
  STARRED_WORDS: "/starred-words",
  ID: "/:id",
  ID_STARRED: "/:idstarred",
};

const EMPTY = {
  INFO: {
    definition: "no definition",
    partOfSpeech: "not specified",
  },
  DEFINITION: "no definition",
  PART: "not specified",
  PRONUNCIATION: {
    NOT_SPECIFIED: "not specified",
    ALL: "all",
  },
  STRING: "",
  ARRAY: [],
};

const LOCAL_STORAGE_ITEM = "alexk08-dictionaryState";

const LINK_TITLE = {
  WORD_KEEPER: "Word Keeper",
  STARRED_WORDS: "Starred Words",
};

export { URL, HEADERS, PAGE_NAMES, FILTERS, ROUTE, EMPTY, FILTER_ALL, LOCAL_STORAGE_ITEM, LINK_TITLE };
