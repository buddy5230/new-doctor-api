"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        default: 'User',
    },
}, { versionKey: false, collection: 'users' });
exports.default = mongoose_1.default.model('users', userSchema);
