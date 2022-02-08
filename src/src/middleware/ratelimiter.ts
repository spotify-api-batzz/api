import rateLimit from "express-rate-limit";
import { mustGetEnv } from "../util";

const authKey = mustGetEnv("AUTH_HEADER");

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (req, res, next, options) => {
    const auth = req.header("authorization");
    if (auth === authKey) {
      next();
      return;
    }
    res.status(options.statusCode).send(options.message);
  },
});
