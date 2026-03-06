import type { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
}
