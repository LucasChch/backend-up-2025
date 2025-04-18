import { Request, Response, NextFunction } from 'express';
import { ValidationError, NotFoundError } from "../models/errors";
import mongoose from 'mongoose';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Si es un error de validación personalizado
    if (err instanceof ValidationError || err instanceof NotFoundError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            error: err.name,
            message: err.message
        });
        return;
    }

    // Mongoose validation errors
    if (err instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message,
            value: error.value
        }));

        res.status(400).json({
            statusCode: 400,
            error: 'ValidationError',
            message: 'Error de validación del modelo',
            details: errorMessages
        });
        return;
    }

    // Cast errors (invalid ObjectId, etc.)
    if (err instanceof mongoose.Error.CastError) {
        res.status(400).json({
            statusCode: 400,
            error: 'CastError',
            message: `Valor inválido para el campo ${err.path}: ${err.value}`,
            field: err.path,
            value: err.value
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