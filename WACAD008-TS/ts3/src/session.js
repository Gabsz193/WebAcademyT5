"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStorage = void 0;
var SessionStorage = /** @class */ (function () {
    function SessionStorage(key) {
        this.key = key;
    }
    SessionStorage.prototype.getAll = function () {
        return JSON.parse(sessionStorage.getItem(this.key) || '[]');
    };
    SessionStorage.prototype.getByKey = function (key, value) {
        var values = this.getAll();
        var returnedValue = values.filter(function (v) { return v[key] == value; });
        if (returnedValue.length === 1) {
            return returnedValue[0];
        }
        else {
            return returnedValue;
        }
    };
    SessionStorage.prototype.push = function (value) {
        var values = this.getAll();
        values.push(value);
        sessionStorage.setItem(this.key, JSON.stringify(values));
    };
    SessionStorage.prototype.updateByKey = function (key, value, newValue) {
        var values = this.getAll();
        var index = values.findIndex(function (v) { return v[key] == value; });
        if (index !== -1) {
            values[index] = newValue;
            sessionStorage.setItem(this.key, JSON.stringify(values));
        }
        else {
            throw new Error("Valor não encontrado");
        }
    };
    SessionStorage.prototype.deleteByKey = function (key, value) {
        var values = this.getAll();
        values = values.filter(function (v) { return v[key] !== value; });
        sessionStorage.setItem(this.key, JSON.stringify(values));
    };
    return SessionStorage;
}());
exports.SessionStorage = SessionStorage;
