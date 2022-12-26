import { test, expect } from '@playwright/test';
import { DateStep } from '../src/index'

test.describe.serial('[DateStep] 时间间隔生成', () => {
  test('[正常测试] 时间间隔生成', async ({ }) => {
    const result = DateStep('m', '2022-10-21 10:00:00', '2022-10-21 10:10:00', 'YYYY-MM-DD HH:mm:ss');

    expect(result.length).toBe(11);
    expect(result[5]).toEqual('2022-10-21 10:05:00');
  });

  test('[默认格式] 时间间隔生成', async ({ }) => {
    const result = DateStep('m', '2022-10-21 10:00:00', '2022-10-21 10:10:00');

    expect(result[5]).toEqual('2022-10-21 10:05:00');
  });

  test('[传参错误1] 时间间隔生成', async ({ }) => {
    const result = DateStep('m', '2022-10-21 10:00:00', '');

    expect(result).toEqual(["Invalid date"]);
  });

});
