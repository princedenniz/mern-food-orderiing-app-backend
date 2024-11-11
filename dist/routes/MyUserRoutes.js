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
const express_1 = require("express");
const MyUserController_1 = __importDefault(require("../controllers/MyUserController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, MyUserController_1.default.getCurrentUser);
// Define POST route with async handling
router.post("/", auth_1.jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MyUserController_1.default.createCurrentUser(req, res);
    }
    catch (error) {
        next(error); // Pass any errors to the global error handler
    }
}));
// Define PUT route with async handling and additional middleware
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MyUserController_1.default.updateCurrentUser(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
