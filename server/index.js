const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT ?? 9000;

const db = new Map();
let counter = 0;

const app = express();
app.use(bodyParser.json());

/*
  curl http://localhost:9000/
*/
app.get("/", function (req, res) {
  let questions = [...db.keys()];
  res.json(questions);
});

/*
  curl http://localhost:9000/0
*/
app.get("/:id", function (req, res) {
  const id = String(req.params.id);
  if (!db.has(id)) {
    res.status(404).json({
      id,
      error: "not found",
    });
    return;
  }

  let question = db.get(id);
  res.json(question);
});

/*
  curl -X POST -H 'content-type: application/json'  http://localhost:9000/ -d '{ "hello": true }'
*/
app.post("/", function (req, res) {
  const _id = counter++;
  const id = String(_id);
  db.set(id, req.body);
  res.status(201).json({
    id,
    created: true,
  });
});

/*
  curl http://localhost:9000/0

  curl -X PUT -H 'content-type: application/json'  http://localhost:9000/0 -d '{ "hello": false }'
  curl http://localhost:9000/0

  curl -X PUT -H 'content-type: application/json'  http://localhost:9000/300 -d '{ "hello": true }'
  curl http://localhost:9000/300
*/
app.put("/:id", function (req, res) {
  const id = String(req.params.id);
  const existed = db.has(id);
  db.set(id, req.body);
  if (!existed) {
    res.status(201);
  } else {
    res.status(200);
  }
  res.send({
    id,
    created: !existed,
    updated: existed,
  });
});

/*
  curl -X DELETE -H 'content-type: application/json'  http://localhost:9000/0
*/
app.delete("/:id", function (req, res) {
  const id = String(req.params.id);
  const deleted = db.delete(id);
  res.send({
    id,
    deleted,
  });
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server listening on: ${JSON.stringify(server.address())}`);
});
