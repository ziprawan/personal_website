import { Model, Schema, model, models } from "mongoose";

export type TypeNotes = {
  id: string;
  username: string;
  title: string;
  content: string;
  categories: string[];
  isPrivate: boolean;
};

const notesSchema = new Schema<TypeNotes>({
  id: {
    type: String,
    unique: true,
  },
  username: String,
  title: String,
  content: String,
  categories: {
    type: [String],
    required: false,
  },
  isPrivate: Boolean,
});

const NotesModel =
  (models.notes as Model<TypeNotes>) || model<TypeNotes>("notes", notesSchema);

export default NotesModel;
