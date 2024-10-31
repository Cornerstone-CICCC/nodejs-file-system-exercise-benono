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
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const server = http_1.default.createServer((req, res) => {
    // Allow all clients to access server
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Pre-flight check
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }
    // Parse url
    const parsedUrl = url_1.default.parse(req.url || "", true);
    const fileName = parsedUrl.query.filename;
    const parsedPath = parsedUrl.pathname;
    // Home route
    if (parsedPath === "/") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Welcome to my server!");
        return;
    }
    // View image
    if (parsedPath === "/view-image") {
        const imagePath = path_1.default.join(__dirname, "images/veryhappydog.jpg");
        try {
            ;
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield fs_1.default.promises.readFile(imagePath);
                res.writeHead(200, { "content-type": "image/jpeg" });
                res.end(data);
            }))();
        }
        catch (err) {
            console.error(err);
        }
        return;
    }
    // 404 Fallback if route isn't available
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>Page not found! :(</h1>");
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
