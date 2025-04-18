export class ValidationError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400; // Código de estado HTTP para errores de validación
    }
}

export class NotFoundError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}