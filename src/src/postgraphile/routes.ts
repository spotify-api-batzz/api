import express from "express";
import allowList from "./allowList";
import myzod from "myzod";
import { ForbiddenQueryError, ValidationError } from "../errors";

const extractVars = (reqVars: string | undefined) => {
  if (!reqVars) {
    return undefined;
  }

  const queryVariables = Buffer.from(reqVars, "base64");
  const variables = JSON.parse(queryVariables.toString("utf-8"));

  return variables;
};

const graphqlSchema = myzod.object({
  variables: myzod.string().optional(),
  operationName: myzod.string(),
});

const createPostgraphileRouter = () => {
  const postgraphileRouter = express.Router();
  postgraphileRouter.get("/graphql", (req, res, next) => {
    req.method = "POST";
    req.url = "/graphql";
    try {
      const { variables, operationName } = graphqlSchema.parse(req.query);

      if (!allowList[String(req.query.operationName)]) {
        next(new ForbiddenQueryError());
        return;
      }

      const payload = {
        query: allowList[String(operationName)],
        variables: extractVars(variables),
      };

      req.body = payload;
      next();
    } catch (e) {
      if (e instanceof myzod.ValidationError) {
        next(new ValidationError(e));
        return;
      }
      next(e);
    }
  });

  return postgraphileRouter;
};

export default createPostgraphileRouter;
