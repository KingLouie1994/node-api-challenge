const express = require("express");
const helmet = require("helmet");

const server = express();

const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");

server.use(helmet());
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send("server is running");
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

function logger(req, res, next) {
  const { method, url } = req;
  console.log({
    method,
    url,
    timeStamp: Date.now()
  });
  next();
}

module.exports = server;
