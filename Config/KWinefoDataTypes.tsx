export type ratings = {
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

export interface WineCardProps {
  wineObject: WineObject;
  navigationProps: {};
  likeState: boolean;
}
