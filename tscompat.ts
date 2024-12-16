import { Collection, SlashCommandBuilder } from "discord.js";

declare module "discord.js" {
   interface Client {
      commands?: Collection<SlashCommandBuilder, unknown>;
   }
}
