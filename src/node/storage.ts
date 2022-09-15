import fs from 'fs';
import path from 'path';

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
        const dirPath = path.resolve(this.workSpaceName, this.storageName)
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }
    }
    public async destroy() {
        const dirPath = path.resolve(this.workSpaceName, this.storageName)
        fs.rmdirSync(dirPath, { recursive: true });
    }
    public async getItem<T = any[]> (sKey: string): Promise<T> {
        let raw: string = '';
        const dirPath = path.resolve(this.workSpaceName, this.storageName, sKey + this.TMP_FILE_SAFE_TAIL)
        if (fs.existsSync(dirPath)) {
            raw = fs.readFileSync(dirPath).toString();
        }
        let data: T;
        try {
            data = JSON.parse(raw)
        } catch (error) {
            
        }
        return data! as T
    }
    public async setItem (sKey: string, sValue: any) {
        const dirPath = path.resolve(this.workSpaceName, this.storageName, sKey + this.TMP_FILE_SAFE_TAIL)
        let ans = '';
        try {
            ans = JSON.stringify(sValue)
        } catch (error) {
            ans = `${sValue}`
        }
        fs.writeFileSync(dirPath, ans)
    }
}