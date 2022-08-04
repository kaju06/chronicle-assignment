import { Request, Response } from 'express';
import {
  createDocument,
  deleteDocument,
  editDocument,
  editDocumentAccess,
  fetchAllDocument,
  fetchDocument,
  giveDocumentAccess,
} from '../services/document.service';
export const createDocumentController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const email = req.headers.email as string;
    const response = await createDocument(name, email);
    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};

export const fetchDocumentController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.id);
    const response = await fetchDocument(id);
    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};

export const deleteDocumentController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.id);
    const response = await deleteDocument(id);
    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};

export const editDocumentController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);
    const newName = req.body.newName;
    const response = await editDocument(id, newName);
    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};

export const giveDocumentAccessController = async (
  req: Request,
  res: Response
) => {
  try {
    const { docId, email, access } = req.body;
    const response = await giveDocumentAccess({ docId, email, access });
    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};

export const editDocumentAccessController = async (
  req: Request,
  res: Response
) => {
  try {
    const { docId, email, addAccess, removeAccess } = req.body;
    const response = await editDocumentAccess({
      docId,
      email,
      addAccess,
      removeAccess,
    });
    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};

export const fetchAllDocumentController = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const response = await fetchAllDocument(email);
    res.send(response);
  } catch (e) {
    res.send({ message: e });
  }
};
