import mongoose, { Schema, Document } from 'mongoose';

export interface UserSchemaVac extends Document {
  iduser: string;
  hospital: string;
  numvac: number;
  vac: string;
  daypoint: string;
  timepoint: string;
  symtomps: string;
  status: string;
}

const userSchemaVac: Schema<UserSchemaVac> = new Schema<UserSchemaVac>(
  {
    iduser: {
      type: String,
    },
    hospital: {
      type: String,
    },
    numvac: {
      type: Number,
    },
    vac: {
      type: String,
    },
    daypoint: {
      type: String,
    },
    timepoint: {
      type: String,
    },
    symtomps: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { versionKey: false, collection: 'vaccines' }
);

export default mongoose.model<UserSchemaVac>('vaccines', userSchemaVac);
