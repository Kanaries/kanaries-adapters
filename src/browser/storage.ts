import localforage from 'localforage';

export class VIStorage {
    public storageName: string;
    public storageMode: 'io' | 'cache' | 'mix';
    public TMP_FILE_SAFE_TAIL =  '_.json';
    public workSpaceName: string;
    public constructor (name: string, workSpaceName: string | undefined = 'visual-insights-work-space') {
        this.storageName = name;
        this.workSpaceName = workSpaceName;
    }
    public init() {
        const sto = localforage.createInstance({
            name: this.workSpaceName,
            storeName: this.storageName
        })
        sto.clear();
    }
    public async destroy() {
        return localforage.dropInstance({
            name: this.workSpaceName,
            storeName: this.storageName
        })
    }
    public async getItem<T = any[]> (sKey: string): Promise<T> {
        const sto = localforage.createInstance({
            name: this.workSpaceName,
            storeName: this.storageName
        })
        const ans = await sto.getItem(sKey)
        return ans as T
    }
    public async setItem (sKey: string, sValue: any) {
        const sto = localforage.createInstance({
            name: this.workSpaceName,
            storeName: this.storageName
        })
        await sto.setItem(sKey, sValue)
    }
}