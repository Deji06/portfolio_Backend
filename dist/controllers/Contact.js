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
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
router.post('/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ err: 'please provide all details' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ err: "please provide a valid email address" });
    }
    const phoneRegex = /^[\d\s+()-]{7,15}$/;
    if (phone && !phoneRegex.test(phone)) {
        return res.status(400).json({ err: "please provide a valid phone number" });
    }
    try {
        //transporter
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        //email options
        let mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Job contact: ${name}`,
            text: `📩 New message from your portfolio website!\n
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}`,
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, msg: 'message sent successfully' });
    }
    catch (error) {
        console.error('Error sending email', error);
        res.status(500).json({ success: false, msg: "unable to send message, try again later" });
    }
}));
exports.default = router;
