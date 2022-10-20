const express = require("express");
const cluster = require("cluster");
const os = require("os");
//const { workerData, Worker, isMainThread } = require("worker_threads");
const app = express();

const num = os.cpus().length;
let counter = 0;

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.get("/compute", (req, res) => {
  // to emulate long running task
  counter++;
  console.log("request :", counter);

  let sum = 0;
  for (let i = 0; i < 10e7; i++) {
    sum = sum + i;
  }
  res.json(sum);
});

if (cluster.isMaster) {
  for (let i = 0; i < num; i++) {
    cluster.fork();
  }
} else {
  app.listen(3000, () => {
    console.log(
      `express app listening on @http://localhost:3000/ , PID: ${process.pid}`
    );
  });
}
