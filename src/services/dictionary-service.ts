import { ErrorValue, FoundWords, InputWordData } from "../types/data-types";
import { HEADERS, URL } from "../utils/constants";
import { encodeRegExp } from "../utils/helpers";

const searchWords = async (value: string): Promise<FoundWords> => {
  const url = `${URL.BASE}${URL.SEARCH_PATTERN}${encodeRegExp(value)}${URL.SEARCH_OPTIONS} `;

  const response = await fetch(url, { headers: HEADERS });

  if (!response.ok) {
    throw new Error(ErrorValue[1]);
  }

  const result = await response.json();

  return result;
};

const getWords = async (values: string[]): Promise<InputWordData[]> => {
  const urlsDef = values.map((value) => `${URL.BASE}${value}`);
  const responses = await Promise.all(urlsDef.map((url) => fetch(url, { headers: HEADERS })));

  for (let response of responses) {
    if (!response.ok) {
      throw new Error(ErrorValue[1]);
    }
  }

  const results = await Promise.all(responses.map((response) => response.json()));

  return results;
};

export { searchWords, getWords };
