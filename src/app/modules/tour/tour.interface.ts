import { Model } from 'mongoose';

export type ITour = {
  placesName: string;
  description: string;
  image: string;
  days: string;
  price: string;
  city: string;
  rating?: string; // This property is optional because it is not marked as required in the schema
};

export type ITourModel = Model<ITour, Record<string, unknown>>;

export type ITourFilters = {
  searchTerm?: string;
};
