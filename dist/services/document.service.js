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
exports.fetchAllDocument = exports.editDocumentAccess = exports.giveDocumentAccess = exports.editDocument = exports.deleteDocument = exports.fetchDocument = exports.createDocument = void 0;
const document_model_1 = __importDefault(require("../database/models/document.model"));
const fs_1 = __importDefault(require("fs"));
const short_uuid_1 = __importDefault(require("short-uuid"));
const document_access_enum_1 = require("../enum/document_access.enum");
const sequelize_typescript_1 = require("sequelize-typescript");
const createDocument = (name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const path = short_uuid_1.default.generate();
        fs_1.default.writeFileSync(`${path}-${name}.txt`, name);
        const data = {
            name,
            path: `${path}-${name}.txt`,
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
        return yield document_model_1.default.findOne({ where: { id }, raw: true });
    }
    catch (e) {
        throw e;
    }
});
exports.fetchDocument = fetchDocument;
const deleteDocument = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield document_model_1.default.findOne({
            where: { id, isDeleted: false },
        });
        if (!response) {
            throw 'No such document exists!';
        }
        fs_1.default.unlinkSync(`${response.path}`);
        yield document_model_1.default.update({ isDeleted: true }, { where: { id } });
        return {
            message: 'Document deleted successfully.',
        };
    }
    catch (e) {
        throw e;
    }
});
exports.deleteDocument = deleteDocument;
const editDocument = (id, newName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield document_model_1.default.findOne({
            where: { id, isDeleted: false },
        });
        if (!response) {
            throw 'No such document exists!';
        }
        const newPath = `${response.path.split('-')[0]}-${newName}.txt`;
        fs_1.default.renameSync(response.path, newPath);
        yield document_model_1.default.update({ name: newName, path: newPath }, { where: { id } });
        return {
            message: 'Document name updated successfully.',
        };
    }
    catch (e) {
        throw e;
    }
});
exports.editDocument = editDocument;
const giveDocumentAccess = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { docId, email, access } = data;
        const response = yield document_model_1.default.findOne({
            where: { id: docId, isDeleted: false },
        });
        if (!response) {
            throw 'No such document exists!';
        }
        let updateData = {};
        access.forEach((i) => {
            switch (i) {
                case document_access_enum_1.DocumentAccessEnum.Read:
                    updateData = Object.assign(Object.assign({}, updateData), { readUsers: sequelize_typescript_1.Sequelize.fn('array_append', sequelize_typescript_1.Sequelize.col('read_users'), email) });
                    break;
                case document_access_enum_1.DocumentAccessEnum.Write:
                    updateData = Object.assign(Object.assign({}, updateData), { writeUsers: sequelize_typescript_1.Sequelize.fn('array_append', sequelize_typescript_1.Sequelize.col('write_users'), email) });
                    break;
                case document_access_enum_1.DocumentAccessEnum.Owner:
                    updateData = Object.assign(Object.assign({}, updateData), { owners: sequelize_typescript_1.Sequelize.fn('array_append', sequelize_typescript_1.Sequelize.col('owners'), email) });
                    break;
                default:
                    null;
            }
        });
        yield document_model_1.default.update(updateData, { where: { id: docId } });
        return {
            message: 'Requested access has been granted on the document.',
        };
    }
    catch (e) {
        throw e;
    }
});
exports.giveDocumentAccess = giveDocumentAccess;
const editDocumentAccess = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { docId, email, addAccess, removeAccess } = data;
        const response = yield document_model_1.default.findOne({
            where: { id: docId, isDeleted: false },
        });
        if (!response) {
            throw 'No such document exists!';
        }
        let updateData = {};
        (removeAccess === null || removeAccess === void 0 ? void 0 : removeAccess.length) &&
            (removeAccess === null || removeAccess === void 0 ? void 0 : removeAccess.forEach((i) => {
                switch (i) {
                    case document_access_enum_1.DocumentAccessEnum.Read:
                        updateData = Object.assign(Object.assign({}, updateData), { readUsers: sequelize_typescript_1.Sequelize.fn('array_remove', sequelize_typescript_1.Sequelize.col('read_users'), email) });
                        break;
                    case document_access_enum_1.DocumentAccessEnum.Write:
                        updateData = Object.assign(Object.assign({}, updateData), { writeUsers: sequelize_typescript_1.Sequelize.fn('array_remove', sequelize_typescript_1.Sequelize.col('write_users'), email) });
                        break;
                    case document_access_enum_1.DocumentAccessEnum.Owner:
                        updateData = Object.assign(Object.assign({}, updateData), { owners: sequelize_typescript_1.Sequelize.fn('array_remove', sequelize_typescript_1.Sequelize.col('owners'), email) });
                        break;
                    default:
                        null;
                }
            }));
        (addAccess === null || addAccess === void 0 ? void 0 : addAccess.length) &&
            (addAccess === null || addAccess === void 0 ? void 0 : addAccess.forEach((i) => {
                switch (i) {
                    case document_access_enum_1.DocumentAccessEnum.Read:
                        updateData = Object.assign(Object.assign({}, updateData), { readUsers: sequelize_typescript_1.Sequelize.fn('array_append', sequelize_typescript_1.Sequelize.col('read_users'), email) });
                        break;
                    case document_access_enum_1.DocumentAccessEnum.Write:
                        updateData = Object.assign(Object.assign({}, updateData), { writeUsers: sequelize_typescript_1.Sequelize.fn('array_append', sequelize_typescript_1.Sequelize.col('write_users'), email) });
                        break;
                    case document_access_enum_1.DocumentAccessEnum.Owner:
                        updateData = Object.assign(Object.assign({}, updateData), { owners: sequelize_typescript_1.Sequelize.fn('array_append', sequelize_typescript_1.Sequelize.col('owners'), email) });
                        break;
                    default:
                        null;
                }
            }));
        yield document_model_1.default.update(updateData, { where: { id: docId } });
        return {
            message: 'Requested access has been updated on the document.',
        };
    }
    catch (e) {
        throw e;
    }
});
exports.editDocumentAccess = editDocumentAccess;
const fetchAllDocument = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield document_model_1.default.findAll({ raw: true });
        const documents = response.filter((doc) => {
            var _a, _b, _c;
            return (((_a = doc.readUsers) === null || _a === void 0 ? void 0 : _a.includes(email)) ||
                ((_b = doc.writeUsers) === null || _b === void 0 ? void 0 : _b.includes(email)) ||
                ((_c = doc.owners) === null || _c === void 0 ? void 0 : _c.includes(email)));
        });
        return documents;
    }
    catch (e) {
        throw e;
    }
});
exports.fetchAllDocument = fetchAllDocument;
