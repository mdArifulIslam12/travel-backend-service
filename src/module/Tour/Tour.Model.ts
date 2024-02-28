import { Schema, model } from 'mongoose';
import { TTour } from './Tour.interfact';

const tourSchema = new Schema<TTour>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

const Tour = model<TTour>('Tour', tourSchema);

export default Tour;
