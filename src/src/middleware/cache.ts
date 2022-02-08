import { RequestHandler } from "express";
import { EndpointCacheInformation, Endpoints } from "types";

const cacheDefaults = Object.keys(Endpoints).reduce(
  (prev, key) => ({ ...prev, [key]: { maxAge: "3600" } }),
  {}
) as EndpointCacheInformation;

const cacheTime: EndpointCacheInformation = {
  ...cacheDefaults,
  recentListens: { maxAge: "300" },
};

const cacheMiddleware: RequestHandler = (req, res, next) => {
  const cacheAgeKey = req.header("x-cache-age-key");
  if (cacheAgeKey) {
    console.log(`max-age=${cacheTime[cacheAgeKey]?.maxAge || 3600}`);
    res.header(
      "cache-control",
      `max-age=${cacheTime[cacheAgeKey]?.maxAge || 3600}`
    );
  }
  next();
};

export default cacheMiddleware;
