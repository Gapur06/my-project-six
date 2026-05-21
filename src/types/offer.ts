export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  location: Location;
};
