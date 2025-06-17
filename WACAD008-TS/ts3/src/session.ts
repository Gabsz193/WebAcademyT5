export class SessionStorage<T> {
    private key: string;

    constructor(key : string) {
        this.key = key;
    }

    public getAll() : T[] {
        return JSON.parse(sessionStorage.getItem(this.key) || '[]');
    }

    public getByKey<K extends keyof T>(key: K, value: T[K]) : T | T[] {
        const values : T[] = this.getAll();
        const returnedValue = values.filter((v) => v[key] == value);
        if(returnedValue.length === 1) {
            return returnedValue[0];
        } else {
            return returnedValue;
        }
    }

    public push(value : T) : void {
        const values = this.getAll();
        values.push(value);
        sessionStorage.setItem(this.key, JSON.stringify(values));
    }

    public updateByKey<K extends keyof T>(key: K, value: T[K], newValue: T) : void | never {
        const values = this.getAll();
        const index = values.findIndex((v) => v[key] == value);
        if(index !== -1) {
            values[index] = newValue;
            sessionStorage.setItem(this.key, JSON.stringify(values));
        } else {
            throw new Error("Valor não encontrado");
        }
    }

    public deleteByKey<K extends keyof T>(key: K, value: T[K]) : void {
        let values = this.getAll();
        values = values.filter((v) => v[key] !== value);
        sessionStorage.setItem(this.key, JSON.stringify(values));
    }
}