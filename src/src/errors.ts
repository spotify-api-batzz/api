import { SequelizeScopeError } from "sequelize/types";
import Joi from "joi";

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

export class ValidationError extends APIError {
  public errors: Joi.ValidationError[];
  constructor(errors: Joi.ValidationError[]) {
    super("Malformed body input", 400, errors);
    this.errors = errors;
  }
}
