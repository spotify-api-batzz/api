import {
  APIError,
  InvalidRelation,
  UnknownError,
  ValidationError,
} from "errors";
import { RequestHandler } from "express";
import { equals, reject } from "ramda";
import myzod from "myzod";

// @ts-ignore
const errorMiddleware: RequestHandler = (e, req, res, next) => {
  let realError: APIError = e instanceof APIError ? e : new UnknownError();
  switch (e.name) {
    case "MyZodError":
      realError = new ValidationError(e);

      break;
  }

  console.error(e);
  res.statusCode = realError.statusCode;
  res.send(serializeAPIError(realError));
};

const serializeAPIError = (e: APIError) =>
  reject(equals(undefined))({
    error: e.name,
    message: e.message,
    data: e?.body,
  });

export default errorMiddleware;
