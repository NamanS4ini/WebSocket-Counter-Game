import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICounter extends Document {
  count: number;
  playerCount: number;
  resetCount: number;
  regretCount: number;
  allTimeHigh: number;
}

const CounterSchema: Schema<ICounter> = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  playerCount: {
    type: Number,
    default: 0,
    required: true,
  },
  resetCount: {
    type: Number,
    default: 0,
    required: true,
  },
  regretCount: {
    type: Number,
    default: 0,
    required: true,
  },
  allTimeHigh: {
    type: Number,
    default: 0,
    required: true,
  },
});

export const Counter: Model<ICounter> =
  mongoose.models.Counter || mongoose.model<ICounter>("Counter", CounterSchema);
