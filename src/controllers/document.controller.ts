import { Request, Response } from 'express';
import {
  createDocument,
  deleteDocument,
  editDocument,
  fetchDocument,
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
