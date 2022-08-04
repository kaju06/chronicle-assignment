import { DocumentVisibility } from '../enum/document_visibility.enum';

export interface IDocumentModel {
  id?: number;
  name: string;
  path: string;
  visibility?: DocumentVisibility;
  readUsers?: Array<string>;
  writeUsers?: Array<string>;
  owners: Array<string>;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
