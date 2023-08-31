/**
 * 根据原始数据计算新数据需要新增、删除、更新的数据
 */
export declare class DataCalculator<T extends {
    [x: string]: any;
}> {
    private originalData;
    private newData;
    private primary_key;
    constructor(originalData: T[], newData: T[], primary_key: string);
    calculateChanges(): {
        added: T[];
        updated: T[];
        deleted: T[];
    };
    private areObjectsEqual;
}
//# sourceMappingURL=DataCalculator.d.ts.map