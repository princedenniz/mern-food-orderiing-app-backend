"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyUserController_1 = __importDefault(require("../controllers/MyUserController")); // Ensure this path is correct
const router = (0, express_1.Router)();
// Define the POST route and connect it to the controller
router.post("/", MyUserController_1.default.createCurrentUser);
exports.default = router;
