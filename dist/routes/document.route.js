"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_controller_1 = require("../controllers/document.controller");
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.use('/', validation_1.checkIfUserEmailExistsInHeader, (req, res, next) => {
    next();
});
router.post('/document', (req, res) => {
    (0, document_controller_1.createDocumentController)(req, res);
});
router.get('/document', (req, res) => {
    (0, document_controller_1.fetchDocumentController)(req, res);
});
router.delete('/document', (req, res) => {
    (0, document_controller_1.deleteDocumentController)(req, res);
});
router.put('/document', (req, res) => {
    (0, document_controller_1.editDocumentController)(req, res);
});
router.post('/document/access', (req, res) => {
    (0, document_controller_1.giveDocumentAccessController)(req, res);
});
router.put('/document/access', (req, res) => {
    (0, document_controller_1.editDocumentAccessController)(req, res);
});
// Bonus api
router.get('/document/all', (req, res) => {
    (0, document_controller_1.fetchAllDocumentController)(req, res);
});
exports.default = router;
