import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { sendError } from "../utils/errorHandler";

export const validateBody = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const tree = z.treeifyError(result.error)

      // Convert tree to an array of { field, message }
      const formattedErrors: { field: string; message: string }[] = [];
      const traverse = (obj: any, path: string[] = []) => {
        for (const key in obj) {
          if (Array.isArray(obj[key]?.errors)) {
            obj[key].errors.forEach((msg: string) => {
              formattedErrors.push({ field: [...path, key].join("."), message: msg });
            });
          }
          if (typeof obj[key] === "object") {
            traverse(obj[key], [...path, key]);
          }
        }
      };
      traverse(tree);
      return sendError(res, 400, "Validation failed", formattedErrors);
    }

    req.body = result.data; // cleaned + validated
    next();
  };
};