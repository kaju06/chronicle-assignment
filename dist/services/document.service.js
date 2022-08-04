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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.fetchDocument = exports.createDocument = void 0;
const document_model_1 = __importDefault(require("../database/models/document.model"));
const fs_1 = __importDefault(require("fs"));
const short_uuid_1 = __importDefault(require("short-uuid"));
const createDocument = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const path = short_uuid_1.default.generate();
        fs_1.default.writeFileSync(`${path}.txt`, name);
        const data = {
            name,
            path: `${path}.txt`,
            owners: [email],
        };
        const response = yield new document_model_1.default(data).save();
        return {
            data: { id: response.id },
            message: 'Document created successfully.',
        };
    }
    catch (e) {
        throw e;
    }
});
exports.createDocument = createDocument;
const fetchDocument = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield document_model_1.default.findOne({ where: { id }, raw: true });
        console.log('RES > ', response);
        return response;
    }
    catch (e) {
        throw e;
    }
});
exports.fetchDocument = fetchDocument;
const deleteDocument = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield document_model_1.default.findOne({ where: { id } });
        if (!response) {
            throw 'No such document exists!';
        }
        fs_1.default.unlinkSync(`${response.path}`);
        return yield document_model_1.default.update({ isDeleted: true }, { where: { id } });
    }
    catch (e) {
        throw e;
    }
});
exports.deleteDocument = deleteDocument;
