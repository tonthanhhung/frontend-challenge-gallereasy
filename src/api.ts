import axios from "axios";
import { GiphyResponse } from "./types";

const giphySearchURL = "https://api.giphy.com/v1/gifs/search?q=";
const giphyAPIKey = "xbg2XAjLEw7yhnznHhSfPU5Zew87OKuI";

export const getSearchImages = (
  searchText: string,
  limit: number,
  offset: number
) => {
  return axios
    .get(
      `${giphySearchURL}${encodeURI(
        searchText
      )}&api_key=${giphyAPIKey}&limit=${limit}&offset=${offset *
        limit}&random_id=e826c9fc5c929e0d6c6d423841a282aa`
    )
    .then(({ data: { data } }: GiphyResponse) => {
      return data;
    });
};
