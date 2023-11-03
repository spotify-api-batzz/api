import express from "express";

const createPostgraphileRouter = () => {
  const postgraphileRouter = express.Router();
  postgraphileRouter.get("/graphql", (req, res, next) => {
    req.method = "POST";
    req.url = "/graphql";
    const stringQuery = Buffer.from(req.query.query as string, "base64");
    const payload = {
      query: stringQuery.toString("utf-8"),
      operationName: req.query.operationName,
      variables: req.query.variables,
    };

    req.body = payload;
    next();
  });

  return postgraphileRouter;
};

export default createPostgraphileRouter;
