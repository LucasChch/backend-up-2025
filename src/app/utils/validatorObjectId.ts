import mongoose from "mongoose";
import { ValidationError } from "../models/errors";

export const validateObjectId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("El id debe ser en formato ObjectId");
    }
};