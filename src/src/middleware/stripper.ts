import { RequestHandler } from "express";
import { omit, pick } from "ramda";

const stripMiddleware: RequestHandler = (req, res, next) => {
  req.query = omit(["hour"], req.query);
  next();
};

export default stripMiddleware;
