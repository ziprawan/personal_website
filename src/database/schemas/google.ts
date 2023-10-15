import { Model, Schema, model, models } from "mongoose";

export type TypeGoogle = {
  id: string;
  name: string;
  email: string;
  picture: string;
  locale: string;
  username: string;
};

const googleSchema = new Schema<TypeGoogle>({
  id: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  name: String,
  picture: String,
  locale: String,
});

const GoogleModel =
  (models.google as Model<TypeGoogle>) ||
  model<TypeGoogle>("google", googleSchema);

export default GoogleModel;
