import DocumentModel from '../database/models/document.model';
import fs from 'fs';
import { IDocumentModel } from '../interfaces/document.model';
import uuid from 'short-uuid';
import { DocumentAccessEnum } from '../enum/document_access.enum';
import { Sequelize } from 'sequelize-typescript';
import { DocumentVisibility } from '../enum/document_visibility.enum';

export const createDocument = async (
  name: string,
  email: string,
  visibility: DocumentVisibility
) => {
  try {
    const path = uuid.generate();

    // Creating file in local. Ideally, it should be uploaded to cloud
    fs.writeFileSync(`${path}-${name}.txt`, name);
    const data: IDocumentModel = {
      name,
      path: `${path}-${name}.txt`,
      owners: [email],
      visibility,
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

export const fetchDocument = async (requesterEmail: string, id: number) => {
  try {
    const response = await DocumentModel.findOne({ where: { id }, raw: true });
    if (!response) {
      throw 'No such document exists!';
    }
    if (
      response?.visibility === DocumentVisibility.Public ||
      response?.readUsers.includes(requesterEmail) ||
      response?.writeUsers.includes(requesterEmail) ||
      response?.owners.includes(requesterEmail)
    ) {
      return response;
    } else throw 'User is not allowed to access this document.';
  } catch (e) {
    throw e;
  }
};

export const deleteDocument = async (requesterEmail: string, id: number) => {
  try {
    const response = await DocumentModel.findOne({
      where: { id, isDeleted: false },
    });
    if (!response) {
      throw 'No such document exists!';
    }
    if (response?.owners.includes(requesterEmail)) {
      fs.unlinkSync(`${response.path}`);
      await DocumentModel.update({ isDeleted: true }, { where: { id } });
      return {
        message: 'Document deleted successfully.',
      };
    } else throw 'User is not allowed to delete this document.';
  } catch (e) {
    throw e;
  }
};

export const editDocument = async (
  requesterEmail: string,
  id: number,
  newName: string
) => {
  try {
    const response = await DocumentModel.findOne({
      where: { id, isDeleted: false },
    });
    if (!response) {
      throw 'No such document exists!';
    }
    if (response?.owners.includes(requesterEmail)) {
      const newPath = `${response.path.split('-')[0]}-${newName}.txt`;
      fs.renameSync(response.path, newPath);
      await DocumentModel.update(
        { name: newName, path: newPath },
        { where: { id } }
      );
      return {
        message: 'Document name updated successfully.',
      };
    } else throw 'User is not allowed to edit this document.';
  } catch (e) {
    throw e;
  }
};

export const giveDocumentAccess = async (data: {
  requesterEmail: string;
  docId: number;
  email: string;
  access: Array<DocumentAccessEnum>;
}) => {
  try {
    const { docId, email, access, requesterEmail } = data;
    const response = await DocumentModel.findOne({
      where: { id: docId, isDeleted: false },
    });
    if (!response) {
      throw 'No such document exists!';
    }
    if (
      response?.writeUsers.includes(requesterEmail) ||
      response?.owners.includes(requesterEmail)
    ) {
      let updateData = {};
      access.forEach((i) => {
        switch (i) {
          case DocumentAccessEnum.Read:
            updateData = {
              ...updateData,
              readUsers: Sequelize.fn(
                'array_append',
                Sequelize.col('read_users'),
                email
              ),
            };
            break;
          case DocumentAccessEnum.Write:
            updateData = {
              ...updateData,
              writeUsers: Sequelize.fn(
                'array_append',
                Sequelize.col('write_users'),
                email
              ),
            };
            break;
          case DocumentAccessEnum.Owner:
            updateData = {
              ...updateData,
              owners: Sequelize.fn(
                'array_append',
                Sequelize.col('owners'),
                email
              ),
            };
            break;
          default:
            null;
        }
      });
      await DocumentModel.update(updateData, { where: { id: docId } });
      return {
        message: 'Requested access has been granted on the document.',
      };
    } else throw 'User is not allowed to share this document.';
  } catch (e) {
    throw e;
  }
};

export const editDocumentAccess = async (data: {
  requesterEmail: string;
  docId: number;
  email: string;
  addAccess: Array<DocumentAccessEnum>;
  removeAccess: Array<DocumentAccessEnum>;
}) => {
  try {
    const { docId, email, addAccess, removeAccess, requesterEmail } = data;
    const response = await DocumentModel.findOne({
      where: { id: docId, isDeleted: false },
    });
    if (!response) {
      throw 'No such document exists!';
    }
    if (response?.owners.includes(requesterEmail)) {
      let updateData = {};
      removeAccess?.length &&
        removeAccess?.forEach((i) => {
          switch (i) {
            case DocumentAccessEnum.Read:
              updateData = {
                ...updateData,
                readUsers: Sequelize.fn(
                  'array_remove',
                  Sequelize.col('read_users'),
                  email
                ),
              };
              break;
            case DocumentAccessEnum.Write:
              updateData = {
                ...updateData,
                writeUsers: Sequelize.fn(
                  'array_remove',
                  Sequelize.col('write_users'),
                  email
                ),
              };
              break;
            case DocumentAccessEnum.Owner:
              updateData = {
                ...updateData,
                owners: Sequelize.fn(
                  'array_remove',
                  Sequelize.col('owners'),
                  email
                ),
              };
              break;
            default:
              null;
          }
        });
      addAccess?.length &&
        addAccess?.forEach((i) => {
          switch (i) {
            case DocumentAccessEnum.Read:
              updateData = {
                ...updateData,
                readUsers: Sequelize.fn(
                  'array_append',
                  Sequelize.col('read_users'),
                  email
                ),
              };
              break;
            case DocumentAccessEnum.Write:
              updateData = {
                ...updateData,
                writeUsers: Sequelize.fn(
                  'array_append',
                  Sequelize.col('write_users'),
                  email
                ),
              };
              break;
            case DocumentAccessEnum.Owner:
              updateData = {
                ...updateData,
                owners: Sequelize.fn(
                  'array_append',
                  Sequelize.col('owners'),
                  email
                ),
              };
              break;
            default:
              null;
          }
        });
      await DocumentModel.update(updateData, { where: { id: docId } });
      return {
        message: 'Requested access has been updated on the document.',
      };
    } else throw 'User is not allowed to edit access to this document.';
  } catch (e) {
    throw e;
  }
};

export const fetchAllDocument = async (email: string) => {
  try {
    const response = await DocumentModel.findAll({ raw: true });
    const documents = response.filter((doc) => {
      return (
        doc.visibility === DocumentVisibility.Public ||
        doc.readUsers?.includes(email) ||
        doc.writeUsers?.includes(email) ||
        doc.owners?.includes(email)
      );
    });
    return documents;
  } catch (e) {
    throw e;
  }
};
