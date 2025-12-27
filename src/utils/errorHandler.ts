import { Response } from "express";

export interface ApiError {
  field?: string;
  message: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: ApiError[];
}

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: ApiError[]
) => {
  const payload: ErrorResponse = {
    statusCode,
    message,
  };

  if (errors && errors.length > 0) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};