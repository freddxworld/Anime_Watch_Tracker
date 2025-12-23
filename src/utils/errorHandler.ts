interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

export const sendError = (
  res: any,
  statusCode: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const payload: ErrorResponse = { statusCode, message };
  if (errors) payload.errors = errors;

  return res.status(statusCode).json(payload);
};