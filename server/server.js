"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
// state
var history = [];
var result;
// server setup
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 5000;
app.use(express_1["default"].json());
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
app.use(express_1["default"].static('server/public/'));
// api requests
app.post('/calc', function (req, res) {
    var calculation = req.body.calculation;
    // validateArray returns true if every item is either a number or operator
    if (validateArray(calculation) !== true) {
        res.sendStatus(409);
        return;
    }
    result = calculateResult(calculation);
    history.push({ calculation: calculation.join(' '), result: result });
    res.sendStatus(201);
});
app.get('/calc', function (req, res) {
    res.send(JSON.stringify({ result: result, history: history }));
});
app["delete"]('/clear', function (req, res) {
    history = [];
    res.sendStatus(201);
});
// functions
function getOperator(stringOp) {
    switch (stringOp) {
        case '+':
            return function (a, b) { return a + b; };
        case '-':
            return function (a, b) { return a - b; };
        case '*':
            return function (a, b) { return a * b; };
        case '/':
            return function (a, b) { return a / b; };
        default:
            return function (a, b) { return a % b; };
    }
}
function calculateResult(calcArr) {
    var newCalc = __spreadArray([], calcArr, true);
    while (newCalc.includes('*') || newCalc.includes('/')) {
        var index = newCalc.findIndex(function (el) { return el === '*' || el === '/'; });
        var operator = getOperator(newCalc[index]);
        var replacement = operator(+newCalc[index - 1], +newCalc[index + 1]);
        newCalc.splice(index - 1, 3, replacement.toString());
    }
    while (newCalc.includes('+') || newCalc.includes('-')) {
        var index = newCalc.findIndex(function (el) { return el === '+' || el === '-'; });
        var operator = getOperator(newCalc[index]);
        var replacement = operator(+newCalc[index - 1], +newCalc[index + 1]);
        newCalc.splice(index - 1, 3, replacement.toString());
    }
    return +newCalc[0];
}
function validateArray(calcArr) {
    var regex = /\d+|[\/\+\-\*\%]/;
    var validator = function (item) { return regex.test(item); };
    return calcArr.every(function (item) { return validator(item); });
}
