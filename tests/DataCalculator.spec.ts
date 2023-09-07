import { test, expect } from '@playwright/test';
import { DataCalculator, ICalculator } from '../src/index'

test.describe.serial('[DateStep] 数据计算', () => {
  test('[正常测试] 数据计算', async ({ }) => {
    let ori_data: any[] = [{
      key: 1,
      name:1
    },
    {
      key: 2,
      name:2
    }];
    let new_data: any[] = [
      {
        key: 1,
        name:11
      },
      {
        key: 3,
        name:3
      }
    ];

    // for (let i = 0; i < 10000; i++) {
    //   let data = { key: i, name: "aaaa" };
    //   ori_data.push(data)
    //   if (i % 2 === 0) {
    //     new_data.push(data)
    //   }
    // }

    const dataCalculator = new DataCalculator('key');
    const result: ICalculator<any> = dataCalculator.calculateChanges(ori_data, new_data);

    expect(result).toHaveProperty('added')
    expect(result).toHaveProperty('updated')
    expect(result).toHaveProperty('deleted')
  });

});
