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
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const MyUserRoutes_1 = __importDefault(require("./routes/MyUserRoutes"));
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to database"))
    .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit on database connection error
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"], // Restrict CORS to frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.get("health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "health OK!" });
}));
// Routes
app.use("/api/my/user", MyUserRoutes_1.default);
// Global error handler
app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});
// Start the server
app.listen(7000, () => {
    console.log("Server started on localhost:7000");
});
