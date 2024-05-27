import express from "express";

const createIngestRouter = () => {
  const ingestRouter = express.Router();

  ingestRouter.get("/ingest", async (req, res, next) => {
    const response = {
      recentListens: 1,
      topArtists: 12,
      topSongs: 12,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    res.statusCode = 200;
    res.send(response);
  });

  return ingestRouter;
};

export default createIngestRouter;
