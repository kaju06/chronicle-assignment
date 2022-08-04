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
const express_1 = __importDefault(require("express"));
const document_route_1 = __importDefault(require("./routes/document.route"));
const database_1 = require("./database");
/**
 * @description meta app main class
 * @export
 * @class App
 */
class App {
    /**
     * Creates an instance of App.
     * @param {string} [port=3000] server port for webserver
     * @param {Application} application Express application instance
     * @memberof App
     */
    constructor(port, application) {
        this.port = port;
        this.application = application;
        this.bootstrap();
    }
    /**
     * @description Starts server on specified port
     * @memberof App
     */
    start() {
        this.server = this.application.listen(this.port, () => {
            console.info(`Service started listening on port:: ${this.port}`);
        });
    }
    /**
     * @description Bootstraps all the components
     * @memberof App
     */
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectToDatabase();
            this.initRoutes();
            this.start();
        });
    }
    /**
     * @description Initialized Routes
     * @memberof App
     */
    initRoutes() {
        console.info('Configuring routes');
        this.application.use(express_1.default.json());
        this.application.use(document_route_1.default);
    }
    /**
     * @description Connects to database & register models
     * @memberof App
     */
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('Connecting to database');
            yield database_1.Database.connect();
        });
    }
    /**
     * @description Graceful shutdown
     * @memberof App
     */
    gracefulShutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.server.close();
                yield database_1.Database.gracefulShutdown();
                process.exit(0);
            }
            catch (e) {
                process.exit(1);
            }
        });
    }
    /**
     * @description
     * @memberof App
     */
    shutdown() {
        this.server.close();
    }
}
exports.default = App;
