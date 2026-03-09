import { app } from "@/app.js";
import { createAndAuthenticateUse } from "@/utils/test/create-and-authenticate-use.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.only("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUse(app);

    const gym1 = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description.",
        phone: "11999999999",
        latitude: -13.0120686,
        longitude: -38.4686105,
      });

    const gym2 = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description.",
        phone: "11999999999",
        latitude: -12.705399,
        longitude: -38.3235184,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: -13.0120686, longitude: -38.4686105 })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms[0].title).toEqual("JavaScript Gym");
  });
});
