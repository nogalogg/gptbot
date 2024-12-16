import * as path from "@std/path";
import { Collection, SlashCommandBuilder } from "discord.js";

export default () => {
   const commands = new Collection<SlashCommandBuilder, unknown>();

   const commandsPath = path.join(Deno.cwd(), "bot", "commands");
   const commandFiles = Deno.readDirSync(commandsPath);
   for (const file of commandFiles) {
      if (
         file.isFile &&
         (file.name.endsWith(".ts") || file.name.endsWith(".js"))
      ) {
         const filePath = path.toFileUrl(path.join(commandsPath, file.name));
         import(filePath.href)
            .then((command) => {
               command = command.default;
               if ("data" in command.com && "execute" in command.com) {
                  commands.set(command.com.data.name, command.com);
               } else {
                  console.warn(
                     `[AVISO] O comando em ${filePath} está sem uma propriedade "data" ou "execute".`,
                  );
               }
            })
            .catch((err) => {
               console.error(
                  `Falha ao importar aquivo de comando ${filePath}:`,
                  err,
               );
            });
      }
   }

   return commands;
};
