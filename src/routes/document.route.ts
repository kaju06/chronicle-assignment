import {
  createDocumentController,
  deleteDocumentController,
  editDocumentController,
  fetchDocumentController,
} from '../controllers/document.controller';
import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/document', (req: Request, res: Response) => {
  createDocumentController(req, res);
});

router.get('/document', (req: Request, res: Response) => {
  fetchDocumentController(req, res);
});

router.delete('/document', (req: Request, res: Response) => {
  deleteDocumentController(req, res);
});

router.put('/document', (req: Request, res: Response) => {
  editDocumentController(req, res);
});

router.post('/document/access', (req: Request, res: Response) => {});

router.put('/document/access', (req: Request, res: Response) => {});

export default router;
