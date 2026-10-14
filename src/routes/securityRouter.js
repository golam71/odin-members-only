import { Router } from "express";
import {
  securityHeaders,
  limitBody,
  csrfProtection,
  rateLimiter,
} from "../lib/security.js";

const securityRouter = Router();

securityRouter.use(securityHeaders);
securityRouter.use(limitBody);
securityRouter.use(csrfProtection);
securityRouter.use(rateLimiter);

export default securityRouter;
