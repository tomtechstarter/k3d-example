import express from "express";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
}

const app = express();

app.get("/", (req, res) => {
  console.log("Hello World Call");
  res.send("Hello World");
});

app.get("/api", (req, res) => {
  console.log("Hello World from API Call");
  res.send("Hello World from API");
});

app.listen(4040, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${4040}`);
});
