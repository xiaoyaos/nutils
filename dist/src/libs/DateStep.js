"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateStep = void 0;
const moment_1 = __importDefault(require("moment"));
/**
 * 生成指定时间区间内时间间隔
 * @param interval 时间间隔
 * @param startTime 开始时间
 * @param endTime  结束时间
 * @param format 时间格式
 * @returns
 */
function DateStep(interval, startTime, endTime, format = 'YYYY-MM-DD HH:mm:ss') {
    endTime = (0, moment_1.default)(new Date(endTime)).format(format);
    startTime = (0, moment_1.default)(new Date(startTime)).format(format);
    let startVal = (0, moment_1.default)(new Date(startTime)).format(format);
    let dayArr = [];
    while ((0, moment_1.default)(startVal).isBefore(endTime)) {
        dayArr.push(startVal);
        // 自增
        startVal = (0, moment_1.default)(new Date(startVal)).add(1, interval).format(format);
    }
    // 将结束日期的天放进数组
    // if(interval == 'day' || interval == 'days'){
    dayArr.push((0, moment_1.default)(new Date(endTime)).format(format));
    // }
    dayArr = Array.from(new Set(dayArr));
    return dayArr;
}
exports.DateStep = DateStep;
