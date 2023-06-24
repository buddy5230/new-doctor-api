"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var vaccine_1 = require("../models/vaccine");
var router = (0, express_1.default)();
router.route('/his').get(function (req, res, next) {
    vaccine_1.default
        .find()
        .then(function (data) {
        console.log(data);
        res.json(data);
    })
        .catch(function (error) {
        //return next(error);
    });
});
router.route('/update/:id').put(function (req, res, next) {
    vaccine_1.default
        .findByIdAndUpdate(req.params.id, {
        $set: req.body,
    })
        .then(function (data) {
        res.json(data);
    })
        .catch(function (error) {
        return next(error);
    });
});
// ลบข้อมูล
router.route('/delete/:id/:id').delete(function (req, res, next) {
    vaccine_1.default
        .findByIdAndRemove(req.params.id)
        .then(function (data) {
        if (!data) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลที่ต้องการลบ' });
        }
        res.json({ message: 'ลบข้อมูลเรียบร้อยแล้ว' });
    })
        .catch(function (error) {
        return next(error);
    });
});
exports.default = router;
