export interface ImageType {
  id: string;
  images: {
    ["480w_still"]: {
      url: string;
    };
  };
}
export interface GiphyResponse {
  data: {
    data: ImageType[];
  };
}

