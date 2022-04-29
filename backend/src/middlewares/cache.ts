import { NextFunction, Request, Response, Send } from "express";
import memoryCache from "memory-cache";

export default (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = "__route__" + req.originalUrl || req.url;

    const cache = memoryCache.get(key);
    if (cache) return res.send(cache);

    // if no cache-hit then

    const temp = res.send;

    const customSendFunction: Send = (body) => {
      memoryCache.put(key, body, duration * 1000);
      return temp(body);
    };

    res.send = customSendFunction;

    next();
  };
};
