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
const app_1 = __importDefault(require("./app"));
const configs_1 = __importDefault(require("./constants/configs"));
const express_1 = __importDefault(require("express"));
const bootServer = (port) => {
    const SERVER_PORT = port || configs_1.default.PORT;
    console.debug('Bootstrapping auth service application');
    const app = new app_1.default(SERVER_PORT, (0, express_1.default)());
    process.once('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
        console.info('Got SIGTERM signal.');
        console.info('Proceeding with graceful shutdown.');
        const READINESS_PROBE_DELAY = 10000; // 10s
        setTimeout(app.gracefulShutdown.bind(app), READINESS_PROBE_DELAY);
    }));
    process.on('uncaughtException', (err) => {
        console.error('UncaughtException: ', err);
    });
    process.on('unhandledRejection', (err) => {
        console.error('UnhandledRejection ', err);
    });
    return app;
};
bootServer();
exports.default = bootServer;
