import DocumentModel from '../database/models/document.model';
import fs from 'fs';
import { IDocumentModel } from '../interfaces/document.model';
import uuid from 'short-uuid';
export const createDocument = async (name: string, email: string) => {
  try {
    const path = uuid.generate();
    fs.writeFileSync(`${path}-${name}.txt`, name);
    const data: IDocumentModel = {
      name,
      path: `${path}-${name}.txt`,
      owners: [email],
    };
    const response = await new DocumentModel(data).save();
    return {
      data: { id: response.id },
      message: 'Document created successfully.',
    };
  } catch (e) {
    throw e;
  }
};

export const fetchDocument = async (id: number) => {
  try {
    return await DocumentModel.findOne({ where: { id }, raw: true });
  } catch (e) {
    throw e;
  }
};

export const deleteDocument = async (id: number) => {
  try {
    const response = await DocumentModel.findOne({
      where: { id, isDeleted: false },
    });
    if (!response) {
      throw 'No such document exists!';
    }
    fs.unlinkSync(`${response.path}`);
    await DocumentModel.update({ isDeleted: true }, { where: { id } });
    return {
      message: 'Document deleted successfully.',
    };
  } catch (e) {
    throw e;
  }
};

export const editDocument = async (id: number, newName: string) => {
  try {
    const response = await DocumentModel.findOne({
      where: { id, isDeleted: false },
    });
    if (!response) {
      throw 'No such document exists!';
    }
    const newPath = `${response.path.split('-')[0]}-${newName}.txt`;
    fs.renameSync(response.path, newPath);
    await DocumentModel.update(
      { name: newName, path: newPath },
      { where: { id } }
    );
    return {
      message: 'Document name updated successfully.',
    };
  } catch (e) {
    throw e;
  }
};
