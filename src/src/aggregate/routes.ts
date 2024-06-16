import express from "express";
import Myzod from "myzod";
import AggregateHandler from "./handler";
import { KyDatabase } from "../types";

const recentListensByMonthSchema = Myzod.object({
  userId: Myzod.string(),
  before: Myzod.string().optional(),
  after: Myzod.string().optional(),
});

const statsSchema = Myzod.object({
  userId: Myzod.string(),
});

const createAggregateRouter = (db: KyDatabase) => {
  const aggregateRouter = express.Router();
  const aggregateHandler = new AggregateHandler(db);

  aggregateRouter.get("/listensPerDay", async (req, res, next) => {
    try {
      const { userId, before, after } = recentListensByMonthSchema.parse(
        req.query
      );

      const data = await aggregateHandler.getAverageSongsPerDay(
        userId,
        new Date(Number(before)),
        new Date(Number(after))
      );
      res.send(data);
    } catch (e) {
      console.log("caught error");
      next(e);
    }
  });

  aggregateRouter.get("/timeOfDay", async (req, res, next) => {
    try {
      const { userId, before, after } = recentListensByMonthSchema.parse(
        req.query
      );

      const data = await aggregateHandler.getTimeOfDay(
        userId,
        new Date(Number(before)),
        new Date(Number(after))
      );
      res.send(data);
    } catch (e) {
      console.log("caught error");
      next(e);
    }
  });

  aggregateRouter.get("/stats", async (req, res, next) => {
    try {
      const { userId } = statsSchema.parse(req.query);

      const data = await aggregateHandler.stats(userId);
      res.send(data);
    } catch (e) {
      console.log("caught error");
      next(e);
    }
  });

  return aggregateRouter;
};

export default createAggregateRouter;
