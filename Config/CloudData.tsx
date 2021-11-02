export const APIURL = 'https://api.sampleapis.com/wines/reds';

type ratings = {
  average: string;
  reviews: string;
};

export interface WineObject {
  winery: string;
  wine: string;
  rating: ratings;
  id: number;
  image: string;
  location: string;
}
