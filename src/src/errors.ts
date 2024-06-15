import Joi from "joi";
import { ValidationError as MyzodValidationError } from "myzod";

export class APIError extends Error {
  public statusCode: number;
  public body?: Record<string, any>;
  constructor(message: string, statusCode: number, body?: Record<string, any>) {
    super(message);
    this.statusCode = statusCode;
    this.body = body;

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidRelation extends APIError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnknownError extends APIError {
  constructor() {
    super("Unknown error occured", 500);
  }
}

export class ForbiddenQueryError extends APIError {
  constructor() {
    super("Forbidden query", 404);
  }
}

export class ValidationError extends APIError {
  public error: MyzodValidationError;
  constructor(error: MyzodValidationError) {
    super("Malformed body input", 400, error);
    this.error = error;
  }
}
