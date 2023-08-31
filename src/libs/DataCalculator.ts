/**
 * 根据原始数据计算新数据需要新增、删除、更新的数据
 */

export interface ICalculator<T extends { [x: string]: any }> {
    added: T[];
    updated: T[];
    deleted: T[];
}

export class DataCalculator<T extends { [x: string]: any }> {
    private originalData: T[];
    private newData: T[];
    private primary_key: string;

    constructor(originalData: T[], newData: T[], primary_key: string) {
        this.originalData = originalData;
        this.newData = newData;
        this.primary_key = primary_key;
    }

    calculateChanges(): ICalculator<T> {
        const added: T[] = [];
        const updated: T[] = [];
        const deleted: T[] = [];

        // 创建原始数据的映射，以便查找
        const originalDataMap = new Map<number, T>();
        this.originalData.forEach((item) => {
            if (item[this.primary_key] == undefined) {
                throw new Error(`primary_key: ${this.primary_key} deficiency`)
            }
            originalDataMap.set(item[this.primary_key], item);
        });

        // 检查新数据
        this.newData.forEach((newItem) => {
            const originalItem = originalDataMap.get(newItem.id);
            if (!originalItem) {
                // 新数据中找不到对应的原始数据，表示新增
                added.push(newItem);
            } else if (!this.areObjectsEqual(newItem, originalItem)) {
                // 原始数据存在，但与新数据不同，表示更新
                updated.push(newItem);
            }
        });

        // 检查删除的数据
        this.originalData.forEach((originalItem) => {
            if (!this.newData.find((newItem) => newItem.id === originalItem.id)) {
                // 在新数据中找不到对应的原始数据，表示删除
                deleted.push(originalItem);
            }
        });

        return { added, updated, deleted };
    }

    private areObjectsEqual(objA: any, objB: any): boolean {
        // 比较两个对象是否相等
        return JSON.stringify(objA) === JSON.stringify(objB);
    }
}