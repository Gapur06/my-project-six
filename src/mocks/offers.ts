import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    city: 'Amsterdam',
    previewImage: 'img/apartment-01.jpg',
    isPremium: true,
    rating: 4.8,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: 'Amsterdam',
    previewImage: 'img/room.jpg',
    isPremium: false,
    rating: 4.2,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: 'Amsterdam',
    previewImage: 'img/apartment-02.jpg',
    isPremium: true,
    rating: 4.5,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    },
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'House',
    price: 180,
    city: 'Amsterdam',
    previewImage: 'img/apartment-03.jpg',
    isPremium: false,
    rating: 4.0,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10,
    },
  },
];
