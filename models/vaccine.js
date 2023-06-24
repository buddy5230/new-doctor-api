"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchemaVac = new mongoose_1.Schema({
    iduser: {
        type: String,
    },
    hospital: {
        type: String,
    },
    numvac: {
        type: Number,
    },
    vac: {
        type: String,
    },
    daypoint: {
        type: String,
    },
    timepoint: {
        type: String,
    },
    symtomps: {
        type: String,
    },
    status: {
        type: String,
    },
}, { versionKey: false, collection: 'vaccines' });
exports.default = mongoose_1.default.model('vaccines', userSchemaVac);
