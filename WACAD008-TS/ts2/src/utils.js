"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTask = isTask;
exports.formatDate = formatDate;
exports.dateToString = dateToString;
function isTask(task) {
    return (typeof task === "object" &&
        task !== null &&
        "id" in task &&
        "titulo" in task &&
        "date_created" in task &&
        "status" in task);
}
function formatDate(date) {
    return new Date("".concat(date, "T23:59:59"));
}
function dateToString(date) {
    var date_w = new Date(date);
    var _a = [date_w.getFullYear().toString(), (date_w.getMonth() + 1).toString(), date_w.getDate().toString()], year = _a[0], month = _a[1], day = _a[2];
    month = String(date_w.getMonth() + 1).padStart(2, '0');
    day = String(date_w.getDate()).padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
