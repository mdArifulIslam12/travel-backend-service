import { Schema, model } from 'mongoose';
import { ITour } from './Tour.interface';

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: Number, required: true, max: 5 },
    maxPeople: { type: Number, required: true, max: 100 }, // Set maximum value to 100
    minAge: { type: Number, required: true },
    continents: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    categories: { type: String, required: true },
    offer: { type: String },
    tourType: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Tour = model<ITour>('Tour', tourSchema);

export default Tour;
