import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import Tour from './Tour.Model';
import { ITour } from './Tour.interface';

const createTour = async (payload: ITour) => {
  const result = await Tour.create(payload);
  return result;
};

const findDataFromDb = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITour[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Tour.find().sort(sortConditions).skip(skip).limit(limit);

  const total = await Tour.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const findSingleDataFromDb = async (id: string) => {
  const result = await Tour.findById(id);
  return result;
};

const upTour = async (id: string, payload: Partial<ITour>) => {
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
