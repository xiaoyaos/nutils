import { test, expect } from '@playwright/test';
import { DataCalculator, ICalculator } from '../src/index'

test.describe.serial('[DateStep] 数据计算', () => {
  test('[正常测试] 数据计算', async ({ }) => {
    let ori_data: any[] = [];
    let new_data: any[] = [];

    for (let i = 0; i < 10000; i++) {
      let data = { key: i, name: "aaaa" };
      ori_data.push(data)
      if (i % 2 === 0) {
        new_data.push(data)
      }
    }

    const dataCalculator = new DataCalculator(ori_data, new_data, 'key');
    const result:ICalculator<any> = dataCalculator.calculateChanges();
    
    expect(result).toHaveProperty('added')
    expect(result).toHaveProperty('updated')
    expect(result).toHaveProperty('deleted')
  });

});
