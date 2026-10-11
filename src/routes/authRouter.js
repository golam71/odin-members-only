import { Router } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pgSession from "connect-pg-simple";
import pool from "../model/db.js";
import { authenticateUser } from "../model/loginModel.js";
import process from "node:process";

try {
  process.loadEnvFile();
} catch (error) {
  console.log(error);
}

const authRouter = Router();
const PgSessionStore = pgSession(session);

authRouter.use(
  session({
    store: new PgSessionStore({
      pool: pool,
      tableName: "user_sessions",
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await authenticateUser(email, password);

        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, full_name, email, is_member, is_admin FROM users WHERE id = $1",
      [id],
    );

    if (!rows.length) {
      return done(null, false);
    }

    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

export default authRouter;
