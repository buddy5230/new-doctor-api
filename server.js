"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var express_1 = require("express");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var user_route_1 = require("./route/user_route");
var admin_1 = require("./route/admin");
var dbConfig = 'mongodb+srv://poopiratbuddy:1234@cluster0.3evcesm.mongodb.net/?retryWrites=true&w=majority';
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
mongoose_1.default.connect(dbConfig).then(function () {
    console.log('Database successfully connected');
}, function (error) {
    console.log('Could not connect to database: ' + error);
});
app.use("/admin", admin_1.default);
app.use("/", user_route_1.default);
/*const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Node Server has Started at Port " + port);
});*/
