import { app } from "@/app.js";
import { createAndAuthenticateUse } from "@/utils/test/create-and-authenticate-use.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able search gyms by title", async () => {
    const { token } = await createAndAuthenticateUse(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description.",
        phone: "11999999999",
        latitude: -13.0120686,
        longitude: -38.4686105,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description.",
        phone: "11999999999",
        latitude: -13.0120686,
        longitude: -38.4686105,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({ q: "JavaScript" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms[0].title).toEqual("JavaScript Gym");
  });
});
