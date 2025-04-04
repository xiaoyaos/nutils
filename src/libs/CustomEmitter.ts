import EventEmitter from 'events';

export class CustomEmitter extends EventEmitter {
  /**
   * 监听万为socket返回，利用事件监听来做数据处理，目前的弊端是很多逻辑都同步等待监听触发，否则同步等待
   * @param event 事件标识
   * @param callback 回调
   * @returns 
   */
  async listen(event: string | number | symbol, callback?: Function): Promise<any> {
    if (typeof event === 'number') event = event.toString()
    if (callback) {
      this.once(event, (data) => {
        callback(data);
      })
    } else {
      return await new Promise(res => {
        this.once(event, (data) => {
          res(data)
        })
      })
    }
  }

  /**
   * 监听万为socket返回，利用事件监听来做数据处理，目前的弊端是很多逻辑都同步等待监听触发，否则同步等待
   * @param event 事件标识
   * @param callback 回调
   * @returns 
   */
  async listens(event: string | number |symbol, callback?: Function): Promise<any> {
    if (typeof event === 'number') event = event.toString()
    if (callback) {
      this.on(event, (data) => {
        callback(data);
      })
    } else {
      return await new Promise(res => {
        this.on(event, (data) => {
          res(data)
        })
      })
    }
  }
}