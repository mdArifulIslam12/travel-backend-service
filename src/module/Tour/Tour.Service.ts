import Tour from './Tour.Model';
import { TTour } from './Tour.interfact';

const createTour = async (payload: TTour) => {
  const result = await Tour.create(payload);
  return result;
};

const findDataFromDb = async () => {
  const result = await Tour.find();
  return result;
};

const findSingleDataFromDb = async (id: string) => {
  const result = await Tour.findById(id);
  return result;
};

const upTour = async (id: string, payload: Partial<TTour>) => {
  const result = await Tour.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id);
  return result;
};

export const TourService = {
  createTour,
  findDataFromDb,
  findSingleDataFromDb,
  upTour,
  deleteTour,
};
