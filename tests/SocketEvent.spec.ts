import { test, expect } from '@playwright/test';
import { SocketEvent } from '../src/index'

test.describe.serial('[SocketEvent] 事件监听', () => {
  test('[once监听测试] 事件监听', async ({ }) => {
    SocketEvent.listen("ping", (data: any) => {
      expect(data).toHaveProperty('ping', 'pong1');
    });

    SocketEvent.emit('ping', { ping: "pong1" })
    SocketEvent.emit('ping', { ping: "pong2" })
  });

  test('[on监听测试] 事件监听', async ({ }) => {
    let count = 0;
    SocketEvent.listens("ping", (data: any) => {
      count++;
      expect(data).toHaveProperty('ping');
      expect(count).toBeLessThanOrEqual(2);
    });

    SocketEvent.emit('ping', { ping: "pong1" })
    SocketEvent.emit('ping', { ping: "pong2" })
  });

});
