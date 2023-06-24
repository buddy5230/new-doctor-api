"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var user_1 = require("../models/user");
var vaccine_1 = require("../models/vaccine");
var secretKey = "nothing";
var router = express_1.default.Router();
var verifyToken = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "ไม่พบ Token" });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log("เข้าเเล้ว", decoded);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token ไม่ถูกต้องหรือหมดอายุ" });
    }
};
router.route("/").get(function (req, res, next) {
    user_1.default
        .find()
        .then(function (data) {
        console.log(data);
        res.json(data);
    })
        .catch(function (error) {
        return next(error);
    });
});
router.route("/:id").get(function (req, res, next) {
    user_1.default
        .findById(req.params.id)
        .then(function (data) {
        console.log(data);
        res.json(data);
    })
        .catch(function (error) {
        return next(error);
    });
});
router.route("/register").post(function (req, res, next) {
    console.log("req.body.username ", req.body.username);
    user_1.default
        .findOne({ username: req.body.username })
        .then(function (user) {
        console.log("user+1" + user);
        if (user) {
            res.status(409).json({ message: "ยูสเซอร์เนมนี้มีอยู่เเล้วในระบบ" });
        }
        else {
            user_1.default
                .findOne({ email: req.body.email })
                .then(function (user) {
                if (user) {
                    res.status(409).json({ message: "อีเมล์นี้มีอยู่เเล้วในระบบ" });
                }
                else {
                    bcrypt_1.default.hash(req.body.password, 10, function (err, hashedPassword) {
                        if (err) {
                            return next(err);
                        }
                        req.body.password = hashedPassword;
                        user_1.default
                            .create(req.body)
                            .then(function (data) {
                            console.log(data);
                            res.json(data);
                        })
                            .catch(function (error) {
                            res.send({ message: "การเข้าสู่ระบบล้มเหลว" });
                        });
                    });
                }
            })
                .catch(function (error) {
                return next(error);
            });
        }
    })
        .catch(function (error) {
        return next(error);
    });
});
router.route("/login").post(function (req, res, next) {
    var _a = req.body, username = _a.username, password = _a.password;
    user_1.default
        .findOne({ username: username })
        .then(function (user) {
        if (user) {
            bcrypt_1.default.compare(password, user.password, function (err, result) {
                if (err) {
                    console.error(err);
                    res.send({ message: "การเข้าสู่ระบบล้มเหลว" });
                }
                else if (result) {
                    var token = jsonwebtoken_1.default.sign({ userId: user._id }, secretKey);
                    var role = user.role;
                    res.send({
                        message: "เข้าสู่ระบบสำเร็จ",
                        userId: user._id,
                        jwtToken: token,
                        role: role,
                    });
                }
                else {
                    res.send({ message: "เข้าสู่ระบบล้มเหลว" });
                }
            });
        }
        else {
            res.send({ message: "ยังไม่ได้สมัครสมาชิก" });
        }
    })
        .catch(function (err) {
        console.error(err);
        res.send({ message: "การเข้าสู่ระบบล้มเหลว" });
    });
});
router.route("/assess/:id/:id").put(verifyToken, function (req, res, next) {
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
router.route("/booking/:id").post(verifyToken, function (req, res, next) {
    var userId = req.params.id;
    var newBookingData = __assign(__assign({}, req.body), { iduser: userId });
    vaccine_1.default
        .create(newBookingData)
        .then(function (createdBooking) {
        console.log("createdBooking._id", createdBooking._id);
        res.send({ vacId: createdBooking._id });
    })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    });
});
router.route("/historyvac/:id").get(function (req, res, next) {
    var userId = req.params.id;
    vaccine_1.default
        .find({ iduser: userId })
        .then(function (data) {
        res.json(data);
    })
        .catch(function (error) {
        return next(error);
    });
});
router.route("/historyvac/:id/:id").get(function (req, res, next) {
    vaccine_1.default
        .findById(req.params.id)
        .then(function (data) {
        res.json(data);
    })
        .catch(function (error) {
        return next(error);
    });
});
exports.default = router;
