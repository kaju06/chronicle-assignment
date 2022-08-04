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
exports.checkIfUserEmailExistsInHeader = void 0;
const values_1 = __importDefault(require("../constants/values"));
const express_validator_1 = require("express-validator");
const validation_util_1 = require("../utils/validation.util");
const checkIfUserEmailExistsInHeader = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = yield (0, validation_util_1.validateRequest)([
        (0, express_validator_1.header)('email')
            .exists()
            .notEmpty()
            .withMessage(values_1.default.MISSING_REQUEST_PARAM),
    ], req);
    if (!errors.length) {
        return next();
    }
    res.status(400).json(errors);
});
exports.checkIfUserEmailExistsInHeader = checkIfUserEmailExistsInHeader;
