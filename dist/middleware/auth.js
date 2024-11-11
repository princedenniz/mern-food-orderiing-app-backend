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
exports.jwtParse = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// Auth0 JWT validation middleware
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.Auth0_AUDIENCE,
    issuerBaseURL: process.env.Auth0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});
// Middleware to parse JWT and extract user information
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401); // Unauthorized
    }
    const token = authorization.split(" ")[1]; // Extract token from "Bearer <token>"
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const auth0Id = decoded.sub; // Extract auth0Id (subject)
        if (!auth0Id) {
            return res.sendStatus(401); // Unauthorized if no sub found
        }
        // Find user in the database using the auth0Id
        const user = yield user_1.default.findOne({ auth0Id });
        if (!user) {
            return res.sendStatus(401); // Unauthorized if user not found
        }
        // Attach auth0Id and userId to the request object
        req.auth0Id = auth0Id; // No need for type casting
        req.userId = user._id.toString(); // Convert ObjectId to string
        next(); // Proceed to the next middleware
    }
    catch (error) {
        return res.sendStatus(401); // Unauthorized on any error
    }
});
exports.jwtParse = jwtParse;
