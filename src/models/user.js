"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const userSchema = new mongoose.Schema({
//     auth0Id: {
//         type: String,
//         required: true, // changed 'require' to 'required'
//     },
//     name: {
//         type: String,
//         default: '', // optional, can add a default value
//     },
//     addressLine1: {
//         type: String,
//         default: '', // optional
//     },
//     city: {
//         type: String,
//         default: '', // optional
//     },
//     country: {
//         type: String,
//         default: '', // optional
//     },
// });
// const User = mongoose.model("User", userSchema);
// export default User;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    addressLine1: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
