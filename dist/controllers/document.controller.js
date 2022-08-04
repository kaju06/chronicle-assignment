"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllDocumentController = exports.editDocumentAccessController = exports.giveDocumentAccessController = exports.editDocumentController = exports.deleteDocumentController = exports.fetchDocumentController = exports.createDocumentController = void 0;
const document_service_1 = require("../services/document.service");
const createDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const email = req.headers.email;
        const response = yield (0, document_service_1.createDocument)(name, email);
        res.send(response);
    }
    catch (e) {
        res.send({ message: e });
    }
});
exports.createDocumentController = createDocumentController;
const fetchDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.query.id);
        const response = yield (0, document_service_1.fetchDocument)(id);
        res.send(response);
    }
    catch (e) {
        res.send({ message: e });
    }
});
exports.fetchDocumentController = fetchDocumentController;
const deleteDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.query.id);
        const response = yield (0, document_service_1.deleteDocument)(id);
        res.send(response);
    }
    catch (e) {
        res.send({ message: e });
    }
});
exports.deleteDocumentController = deleteDocumentController;
const editDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.body.id);
        const newName = req.body.newName;
        const response = yield (0, document_service_1.editDocument)(id, newName);
        res.send(response);
    }
    catch (e) {
        res.send({ message: e });
    }
});
exports.editDocumentController = editDocumentController;
const giveDocumentAccessController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { docId, email, access } = req.body;
        const response = yield (0, document_service_1.giveDocumentAccess)({ docId, email, access });
        res.send(response);
    }
    catch (e) {
        res.send({ message: e });
    }
});
exports.giveDocumentAccessController = giveDocumentAccessController;
const editDocumentAccessController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { docId, email, addAccess, removeAccess } = req.body;
        const response = yield (0, document_service_1.editDocumentAccess)({
            docId,
            email,
            addAccess,
            removeAccess,
        });
        res.send(response);
    }
    catch (e) {
        res.send({ message: e });
    }
});
exports.editDocumentAccessController = editDocumentAccessController;
const fetchAllDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const response = yield (0, document_service_1.fetchAllDocument)(email);
        res.send(response);
    }
    catch (e) {
        res.send({ message: e });
    }
});
exports.fetchAllDocumentController = fetchAllDocumentController;
