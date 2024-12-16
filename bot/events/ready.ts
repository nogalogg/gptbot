import { Client, Events } from "discord.js";

export default {
   name: Events.ClientReady,
   once: true,
   execute(client: Client) {
      if (client.user) {
         console.log(`BOT Logado com sucesso como ${client.user.tag}`);
      } else {
         console.log("BOT Logado com sucesso, mas o usuário é nulo");
      }
   },
};
