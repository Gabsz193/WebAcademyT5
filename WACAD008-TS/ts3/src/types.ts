export type ID = string;

export interface MockupData {
    cell: string;
    dob: {
        date: string,
    }
    name: {
        first: string;
        last: string;
    };
}