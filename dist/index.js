"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = __importDefault(require("./constants/configs"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = configs_1.default.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
