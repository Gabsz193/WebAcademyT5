export type ID = string;

export type TaskStatus = "Todo" | "Doing" | "Done"

export interface Task {
    id: ID;
    titulo: string;
    descricao?: string;
    date_created: Date;
    date_deadline?: Date;
    status: TaskStatus;
};