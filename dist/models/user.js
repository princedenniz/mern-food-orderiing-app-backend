"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define User Interface
// interface IUser extends Document {
//   auth0Id: string;
//   name?: string;
//   addressLine1?: string;
//   city?: string;
//   country?: string;
// }
// const userSchema = new mongoose.Schema<IUser>({
//   auth0Id: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//   },
//   addressLine1: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   country: {
//     type: String,
//   },
// });
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
