"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Contact_1 = __importDefault(require("./controllers/Contact"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', Contact_1.default);
//routes
app.get('/', (req, res) => {
    res.send('backend is running');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).json({
        success: false,
        message: err.message || "Something went wrong!",
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} `);
});
