import {
  createDocumentController,
  deleteDocumentController,
  editDocumentAccessController,
  editDocumentController,
  fetchAllDocumentController,
  fetchDocumentController,
  giveDocumentAccessController,
} from '../controllers/document.controller';
import express, { NextFunction, Request, Response } from 'express';
import { checkIfUserEmailExistsInHeader } from '../middlewares/validation';

const router = express.Router();

router.use(
  '/',
  checkIfUserEmailExistsInHeader,
  (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

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

router.post('/document/access', (req: Request, res: Response) => {
  giveDocumentAccessController(req, res);
});

router.put('/document/access', (req: Request, res: Response) => {
  editDocumentAccessController(req, res);
});

// Bonus api
router.get('/document/all', (req: Request, res: Response) => {
  fetchAllDocumentController(req, res);
});

export default router;
