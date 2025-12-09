module.exports = {
  "/api/v1/users": {
    post: {
      tags: ["Users"],
      summary: "Create a user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
              },
              required: ["firstName", "lastName", "email", "password"],
            },
          },
        },
      },
      responses: {
        201: { description: "Created" },
      },
    },
  },
};
