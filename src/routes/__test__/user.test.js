const request = require("supertest");
const app = require("../../app");

let verificationToken;
let cookieData;
describe("POST /api/v1/users", () => {
  it("throws error if user data is not provided", async () => {
    const response = await request(app).post("/api/v1/users").send({});

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("First name is required");
  });

  it("returns 201 if user data is provided", async () => {
    const response = await request(app).post("/api/v1/users").send({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@yopmail.com",
      password: "Password1234$$",
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty("firstName");
    expect(response.body.data).toHaveProperty("lastName");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("verificationToken");

    verificationToken = response.body.data.verificationToken;
  });
});

describe("PUT /api/v1/users/verify", () => {
  it("throws error if verification token data is not provided", async () => {
    const response = await request(app).put("/api/v1/users/verify").send({});
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Verification token is required");
  });

  it("throws error if verification token is less than required length", async () => {
    const response = await request(app)
      .put("/api/v1/users/verify")
      .send({ verificationToken: 1234 });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "Verification token must be 6 characters long"
    );
  });

  it("throws error if verification token is not a number", async () => {
    const response = await request(app)
      .put("/api/v1/users/verify")
      .send({ verificationToken: "abcd45" });

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Verification token must be a number");
  });

  it("returns 200 if valid verification token is provided", async () => {
    const response = await request(app).put("/api/v1/users/verify").send({
      verificationToken,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty("firstName");
    expect(response.body.data).toHaveProperty("lastName");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("isVerified");
    expect(response.body.data.isVerified).toBe(true);
    expect(response.body.data.verificationToken).toBeNull();
    expect(response.body.data.verificationTokenExpiresIn).toBeNull();
  });
});

describe("POST /api/v1/auth/login", () => {
  it("throws error if wrong email is provided", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "jodoe@gmail.com", password: "Password1234$$" });

    expect(response.status).toBe(404);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("User not found");
  });

  it("throws error if wrong password is provided", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "johndoe@yopmail.com", password: "WrongPassword1234$$" });

    expect(response.status).toBe(403);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid login credentials");
  });

  it("returns 200 status if valid login credentials is provided", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "johndoe@yopmail.com",
      password: "Password1234$$",
    });

    const cookie = response.get("Set-Cookie");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("refreshToken");

    cookieData = cookie[0];
  });
});

describe("GET /api/v1/users/me", () => {
  it("throws error if no cookie header is provided", async () => {
    const response = await request(app).get("/api/v1/users/me").send({});

    expect(response.status).toBe(403);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Unauthorized access");
  });

  it("returns 200 status code and current user data if cookie header is provided", async () => {
    const response = await request(app)
      .get("/api/v1/users/me")
      .set("Cookie", cookieData)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("firstName");
    expect(response.body.data).toHaveProperty("isVerified");
    expect(response.body.data.isVerified).toBe(true);
  });
});
