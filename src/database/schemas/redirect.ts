import { Model, Schema, model, models } from "mongoose";

type TypeRedirect = {
  name: string;
  allowed: boolean;
};

const redirectSchema = new Schema<TypeRedirect>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  allowed: {
    type: Boolean,
    required: true,
  },
});

const RedirectModel =
  (models.allow_redirect as Model<TypeRedirect>) ||
  model<TypeRedirect>("allow_redirect", redirectSchema);

export default RedirectModel;
