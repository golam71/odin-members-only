import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

// bcrypt only uses the first 72 bytes of a password, so cap it there.
// Other fields get a generous cap to avoid oversized input slowing anything down.
const FIELD_LIMITS = {
  password: 72,
  confirm_password: 72,
  email: 254,
  fullname: 100,
  title: 100,
  text: 1000,
};
const DEFAULT_LIMIT = 200;

export function truncate(value, max = DEFAULT_LIMIT) {
  if (typeof value !== "string" || value.length <= max) return value;
  return value.slice(0, max);
}

// Truncate every string in the request body before it reaches bcrypt/queries,
// so a huge payload can't hang hashing.
export function limitBody(req, res, next) {
  if (req.body && typeof req.body === "object") {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === "string") {
        req.body[key] = truncate(
          req.body[key],
          FIELD_LIMITS[key] ?? DEFAULT_LIMIT,
        );
      }
    }
  }
  next();
}

// Standard security headers. Inline <style> is allowed; upgrade-insecure-requests
// is disabled so local http keeps working.
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "style-src": ["'self'", "'unsafe-inline'"],
      "upgrade-insecure-requests": null,
    },
  },
  // Helmet's default is "no-referrer", which makes browsers send
  // "Origin: null" on form POSTs. That trips csrfProtection below, so use the
  // browser default instead.
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});

// Relaxed limiter: only counts POSTs, so normal browsing is never affected.
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method !== "POST",
  message: "Too many requests. Please try again later.",
});

// CSRF protection via Origin/Referer check, backed by the SameSite=Lax cookie.
// Requires no per-form tokens, so nothing else has to change.
export function csrfProtection(req, res, next) {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(req.method)) return next();

  const origin = req.get("origin") || req.get("referer");
  // Missing or opaque ("null") origin: we can't verify it, so fall back to the
  // SameSite=Lax cookie, which still blocks cross-site POSTs.
  if (!origin || origin === "null") return next();

  try {
    if (new URL(origin).host === req.get("host")) return next();
  } catch {
    // malformed header, fall through to rejection
  }

  return res.status(403).send("Blocked by CSRF protection.");
}
