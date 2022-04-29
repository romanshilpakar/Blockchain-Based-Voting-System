import { createConnection } from "typeorm";
import app from "./server";
import "dotenv/config";

const port = process.env.PORT || 8000;

createConnection()
  .then(async (connection) => {
    app.listen(port, () => console.log(`listening on port ${port} ... `));
  })
  .catch((error) => console.log(error));
