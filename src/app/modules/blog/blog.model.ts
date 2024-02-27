import { Schema, model } from 'mongoose';
import { IBlog, IBlogModel } from './blog.interface';

const blogSchema = new Schema<IBlog, IBlogModel>(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Model.
export const Blog = model<IBlog, IBlogModel>('blog', blogSchema);
