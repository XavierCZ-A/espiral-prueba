import { envs } from "./config/envs";
import { ProductRoutes } from "./routes/product.routes";
import { Server } from "./server";


(async () => {
  main();
})();


async function main() {

  const server = new Server({
    port: envs.PORT,
    routes: ProductRoutes.routes,
  });

  server.start();
}