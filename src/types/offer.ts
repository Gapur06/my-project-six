export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  previewImage: string;
  isPremium: boolean;
  rating: number;
  location: Location;
};
