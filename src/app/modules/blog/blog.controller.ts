import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogFilterableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { ...blogData } = req.body;
  const result = await BlogService.createBlog(blogData);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.getSingleBlog(id);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single blog featch successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await BlogService.updateBlog(id, updatedData);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog delete successfully',
    data: result,
  });
});
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BlogService.getAllBlogs(filters, paginationOptions);

  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all blog fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const blogContorller = {
  createBlog,
  getSingleBlog,
  updateBlog,
  getAllBlog,
  deleteBlog,
};
