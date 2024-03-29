/**
 * 根据原始数据计算新数据需要新增、删除、更新的数据
 */
export interface ICalculator<T extends {
    [x: string]: any;
}> {
    added: T[];
    updated: T[];
    deleted: T[];
}
export declare class DataCalculator<T extends {
    [x: string]: any;
}> {
    private originalData;
    private newData;
    private primary_key;
    constructor(primary_key: string);
    calculateChanges(originalData: T[], newData: T[], contain_keys?: string[]): ICalculator<T>;
    private areObjectsEqual;
}
//# sourceMappingURL=DataCalculator.d.ts.map