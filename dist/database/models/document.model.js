"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_visibility_enum_1 = require("../../enum/document_visibility.enum");
const sequelize_typescript_1 = require("sequelize-typescript");
let DocumentModel = class DocumentModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        autoIncrementIdentity: true,
        allowNull: false,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], DocumentModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], DocumentModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: 'path',
    }),
    __metadata("design:type", String)
], DocumentModel.prototype, "path", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(document_visibility_enum_1.DocumentVisibility.Private, document_visibility_enum_1.DocumentVisibility.Public),
        allowNull: false,
        field: 'visibility',
        defaultValue: document_visibility_enum_1.DocumentVisibility.Private,
    }),
    __metadata("design:type", String)
], DocumentModel.prototype, "visibility", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: true,
        field: 'read_users',
    }),
    __metadata("design:type", Array)
], DocumentModel.prototype, "readUsers", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: true,
        field: 'write_users',
    }),
    __metadata("design:type", Array)
], DocumentModel.prototype, "writeUsers", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
        field: 'owners',
    }),
    __metadata("design:type", Array)
], DocumentModel.prototype, "owners", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        field: 'is_deleted',
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], DocumentModel.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at',
    }),
    __metadata("design:type", Date)
], DocumentModel.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at',
    }),
    __metadata("design:type", Date)
], DocumentModel.prototype, "updatedAt", void 0);
DocumentModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'document',
        timestamps: true,
        underscored: false,
        indexes: [{ fields: ['name'] }],
    })
], DocumentModel);
exports.default = DocumentModel;
