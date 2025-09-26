import express from "express";
import cors from "cors";
import router from "./route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(router);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});
