import { Router } from 'express';
import validateRequest from '../../middlewares/vlidateRequest';
import { blogContorller } from './blog.controller';

import { BlogValidation } from './blog.validation';

const router = Router();

router.post(
  '/create-blog',
  validateRequest(BlogValidation.createBlogZodSchema),
  blogContorller.createBlog,
);
router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlogZodSchema),
  blogContorller.updateBlog,
);
router.get('/:id', blogContorller.getSingleBlog);

router.delete('/:id', blogContorller.deleteBlog);

router.get('/', blogContorller.getAllBlog);

export const BlogRoutes = router;
