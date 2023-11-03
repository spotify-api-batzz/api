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
  console.log(req.header("X-Cache-Age-Key"));
  if (cacheAgeKey && res.statusCode === 200) {
    console.log(`max-age=${cacheTime[cacheAgeKey]?.maxAge || 3600}`);
    res.header(
      "cache-control",
      `max-age=${cacheTime[cacheAgeKey]?.maxAge || 3600}`
    );
  } else if (res.statusCode !== 200) {
    console.log("Non 200, caching for 0 seconds");
    res.header("cache-control", `max-age=0`);
  }
  console.log(req.headers);
  next();
};

export default cacheMiddleware;
