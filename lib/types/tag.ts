import { Types } from "mongoose";

export type Tag = {
  _id: Types.ObjectId;
  name: string;
  parentId?: string;
};
