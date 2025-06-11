export class SessionStorage {
    key;
    constructor(key) {
        this.key = key;
    }
    getAll() {
        return JSON.parse(sessionStorage.getItem(this.key) || '[]');
    }
    getByKey(key, value) {
        const values = this.getAll();
        const returnedValue = values.filter((v) => v[key] == value);
        if (returnedValue.length === 1) {
            return returnedValue[0];
        }
        else {
            return returnedValue;
        }
    }
    push(value) {
        const values = this.getAll();
        values.push(value);
        sessionStorage.setItem(this.key, JSON.stringify(values));
    }
    updateByKey(key, value, newValue) {
        const values = this.getAll();
        const index = values.findIndex((v) => v[key] == value);
        if (index !== -1) {
            values[index] = newValue;
            sessionStorage.setItem(this.key, JSON.stringify(values));
        }
        else {
            throw new Error("Valor não encontrado");
        }
    }
    deleteByKey(key, value) {
        let values = this.getAll();
        values = values.filter((v) => v[key] !== value);
        sessionStorage.setItem(this.key, JSON.stringify(values));
    }
}
