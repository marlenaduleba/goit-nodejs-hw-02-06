const request = require("supertest");
const app = require("../app");

describe("test loginController", () => {
  test("loginController returns status 200, token and users data", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "testpassword" })
      .expect(200);


      expect(res.body.user).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email');
      expect(res.body.user).toHaveProperty('subscription');
      expect(typeof res.body.user.email).toBe('string');
      expect(typeof res.body.user.subscription).toBe('string');
  });
});
