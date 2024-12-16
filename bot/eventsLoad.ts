import * as path from "@std/path";
import { Client } from "discord.js";

export default (client: Client) => {
   const eventsPath = path.join(Deno.cwd(), "bot", "events");
   const eventFiles = Deno.readDirSync(eventsPath);

   for (const file of eventFiles) {
      if (
         file.isFile &&
         (file.name.endsWith(".ts") || file.name.endsWith(".js"))
      ) {
         const filePath = path.toFileUrl(path.join(eventsPath, file.name));
         import(filePath.href)
            .then((event) => {
               event = event.default;
               if (event.once) {
                  client.once(
                     event.name,
                     (...args) => event.execute(...args),
                  );
               } else {
                  client.on(
                     event.name,
                     (...args) => event.execute(...args),
                  );
               }
            })
            .catch((err) => {
               console.error(
                  `Falha ao importar aquivo de evento ${filePath}:`,
                  err,
               );
            });
      }
   }
};
