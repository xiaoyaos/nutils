"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyEmitter = void 0;
const events_1 = __importDefault(require("events"));
class MyEmitter extends events_1.default {
    /**
     * 监听万为socket返回，利用事件监听来做数据处理，目前的弊端是很多逻辑都同步等待监听触发，否则同步等待
     * @param event 事件标识
     * @param callback 回调
     * @returns
     */
    async listen(event, callback) {
        if (callback) {
            this.once(event, (data) => {
                callback(data);
            });
        }
        else {
            return await new Promise(res => {
                this.once(event, (data) => {
                    res(data);
                });
            });
        }
    }
    /**
     * 监听万为socket返回，利用事件监听来做数据处理，目前的弊端是很多逻辑都同步等待监听触发，否则同步等待
     * @param event 事件标识
     * @param callback 回调
     * @returns
     */
    async listens(event, callback) {
        if (callback) {
            this.on(event, (data) => {
                callback(data);
            });
        }
        else {
            return await new Promise(res => {
                this.on(event, (data) => {
                    res(data);
                });
            });
        }
    }
}
exports.MyEmitter = MyEmitter;
