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

    constructor(primary_key: string) {
        this.primary_key = primary_key;
    }

    calculateChanges(originalData: T[], newData: T[], exclude_keys: string[] = []): ICalculator<T> {
        this.originalData = originalData;
        this.newData = newData;

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
            const originalItem = originalDataMap.get(newItem[this.primary_key]);
            if (!originalItem) {
                // 新数据中找不到对应的原始数据，表示新增
                added.push(newItem);
            } else if (!this.areObjectsEqual(newItem, originalItem)) {
                // 原始数据存在，但与新数据不同，表示更新
                if (exclude_keys.length) {
                    let _newItem = JSON.parse(JSON.stringify(newItem));
                    let _originalItem = JSON.parse(JSON.stringify(originalItem));
                    for (const exclude_key of exclude_keys) {
                        delete _newItem[exclude_key]
                        delete _originalItem[exclude_key]
                    }
                    if (!this.areObjectsEqual(_newItem, _originalItem)) {
                        updated.push(newItem);
                    }
                } else {
                    updated.push(newItem);
                }
            }
        });

        // 检查删除的数据
        this.originalData.forEach((originalItem) => {
            if (!this.newData.find((newItem) => newItem[this.primary_key] === originalItem[this.primary_key])) {
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