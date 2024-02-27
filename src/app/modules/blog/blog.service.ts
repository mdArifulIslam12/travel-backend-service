import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { blogSearchableFields } from './blog.constant';
import { IBlog, IBlogFilters } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: IBlog): Promise<IBlog | null> => {
  const createblog = await Blog.create(payload);
  return createblog;
};
const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id);
  return result;
};
const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
): Promise<IBlog | null> => {
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBlog[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: blogSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Blog.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BlogService = {
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
