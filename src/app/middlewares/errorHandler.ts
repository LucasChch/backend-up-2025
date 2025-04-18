import { Request, Response, NextFunction } from 'express';
import { ValidationError } from "../models/errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Si es un error de validación personalizado
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            error: err.name,
            message: err.message
        });
        return;
    }

    // Para otros tipos de errores
    console.error(err);
    res.status(500).json({
        statusCode: 500,
        error: 'InternalServerError',
        message: 'Error interno del servidor'
    });
    return
};