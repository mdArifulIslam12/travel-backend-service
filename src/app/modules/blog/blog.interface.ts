import { Model } from 'mongoose';

export type IBlog = {
  title: string;
  details: string;
  image: string;
};

export type IBlogFilters = {
  searchTerm?: string;
  title?: string;
};

export type IBlogModel = Model<IBlog, Record<string, unknown>>;
