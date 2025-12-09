const http = require("http");
const app = require("./app");
const connectDb = require("./helpers/db-connect");
const { PORT } = require("./config");
const httpServer = http.createServer(app);

const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

startServer();
