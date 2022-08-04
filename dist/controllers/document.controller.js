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
exports.deleteDocumentController = exports.fetchDocumentController = exports.createDocumentController = void 0;
const document_service_1 = require("../services/document.service");
const createDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const email = req.headers.email;
    const response = yield (0, document_service_1.createDocument)(name, email);
    res.send(response);
});
exports.createDocumentController = createDocumentController;
const fetchDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    console.log('ID > ', id);
    const response = yield (0, document_service_1.fetchDocument)(id);
    res.send(response);
});
exports.fetchDocumentController = fetchDocumentController;
const deleteDocumentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    const response = yield (0, document_service_1.deleteDocument)(id);
    res.send(response);
});
exports.deleteDocumentController = deleteDocumentController;
