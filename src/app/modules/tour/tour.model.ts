import { Schema, model } from 'mongoose';
import { ITour, ITourModel } from './tour.interface';

const tourSchema = new Schema<ITour, ITourModel>(
  {
    placesName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    days: { type: String, required: true },
    price: { type: String, required: true },
    city: { type: String, require: true },
    rating: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Model.
export const Tour = model<ITour, ITourModel>('tour', tourSchema);
