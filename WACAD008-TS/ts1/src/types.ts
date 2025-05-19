type ID = number;

type TaskStatus = "Todo" | "Doing" | "Done"

interface Usuario {
    id: ID;
    email: string;
    senha: string;
};

interface Task {
    titulo: string;
    descricao?: string;
    date_created: Date;
    date_deadline?: Date;
    usuario_created_id: ID;
    status: TaskStatus;
};