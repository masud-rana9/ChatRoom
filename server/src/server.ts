import app from "./app/app";
import { config } from "./app/config";

async function main() {
  app.listen(config.port, () => {
    console.log("Sever is running on port ", config.port);
  });
}

main();
