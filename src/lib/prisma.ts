import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import { env } from "@/env/index.js";

export const schema =
  new URL(env.DATABASE_URL).searchParams.get("schema") || "public";

const connectionString = `${env.DATABASE_URL}`;
const adapter = new PrismaPg(
  { connectionString },
  {
    schema,
  },
);

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
