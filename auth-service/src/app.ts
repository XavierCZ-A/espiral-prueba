import { envs } from "./config/envs";
import { AuthRoutes } from "./routes/auth.routes";
import { Server } from "./server";


(async()=> {
  main();
})();


async function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AuthRoutes.routes,
  });

  server.start();
}