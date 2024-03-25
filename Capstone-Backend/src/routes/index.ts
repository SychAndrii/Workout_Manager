import apiRouter from "./api";
import Express from "express";
import healthcheck from "./healthcheck";
import auth from "../authentication";
import userRoutes from "./api/User";

// eslint-disable-next-line
const router = Express.Router();

// TODO: ADD AUTHENTICATION MIDDLEWARE
router.use("/api/user", userRoutes);

/*
const rawBody = () =>
  Express.raw({
    inflate: true,
    limit: "10mb",
    type: (req) => {
      // See if we can parse this content type. If we can, `req.body` will be
      // a Buffer (e.g., `Buffer.isBuffer(req.body) === true`). If not, `req.body`
      // will be equal to an empty Object `{}` and `Buffer.isBuffer(req.body) === false`
      const { type } = contentType.parse(req);
      return Exercise.isSupportedType(type);
    },
  });
*/

// Health Check route
router.get("/", healthcheck);

router.get("/secureHealth", auth.authentication(), healthcheck);

router.use("/api", auth.authentication(), apiRouter);

export default router;
