import { FoundWords, WordDataWithPropStarred, InputWordData, PureWordData } from "../types/data-types";

const encodeRegExp = (value: string): string => {
  return encodeURIComponent(`^${value}[\\w]*\\b$`);
};

const transformFoundWords = (inputData: FoundWords): string[] => {
  const {
    results: { data },
  } = inputData;
  return data;
};

const transformWordData = (inputData: InputWordData[]): PureWordData[] => {
  const result = inputData.map((inputWord) => {
    const { word, pronunciation, results } = inputWord;

    const mainInfo = results?.map(({ definition, partOfSpeech }) => ({
      definition,
      partOfSpeech,
    }));

    return { name: word, pronunciation, mainInfo };
  });

  return result;
};

const addStarredWordInfo = (
  data: PureWordData[],
  stateStarredWords: WordDataWithPropStarred[]
): WordDataWithPropStarred[] => {
  const result = data.map((word) => {
    const { name } = word;
    const isWordStarred = stateStarredWords.some((starredWord) => name === starredWord.name);

    return { ...word, isWordStarred };
  });

  return result;
};

const findIndex = (name: string, wordsState: WordDataWithPropStarred[]): number => {
  return wordsState.findIndex((word) => word.name === name);
};

export { encodeRegExp, transformFoundWords, transformWordData, addStarredWordInfo, findIndex };
