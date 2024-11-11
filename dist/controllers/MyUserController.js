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
const user_1 = __importDefault(require("../models/user"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(currentUser);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
// Controller function to handle user creation
const createCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        // Check if the user exists
        const existingUser = yield user_1.default.findOne({ auth0Id });
        if (existingUser) {
            return res.status(200).json(existingUser); // Return user object if it exists
        }
        // Create a new user if not found
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        // Return the newly created user
        return res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
});
// Controller function to handle user updates
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
        yield user.save();
        res.json(user); // Use `res.json()` for consistency in responses
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
});
// Export the functions
exports.default = {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
};
