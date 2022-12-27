/// <reference types="node" />
declare const _default: MyEmitter;
export default _default;
declare class MyEmitter extends EventEmitter {
    /**
     * 监听万为socket返回，利用事件监听来做数据处理，目前的弊端是很多逻辑都同步等待监听触发，否则同步等待
     * @param event 事件标识
     * @param callback 回调
     * @returns
     */
    listen(event: any, callback: any): Promise<any>;
    /**
     * 监听万为socket返回，利用事件监听来做数据处理，目前的弊端是很多逻辑都同步等待监听触发，否则同步等待
     * @param event 事件标识
     * @param callback 回调
     * @returns
     */
    listens(event: any, callback: any): Promise<any>;
}
import EventEmitter from "events";
//# sourceMappingURL=SocketEvent.d.ts.map