/// <reference path="./tscompat.ts" />

import "jsr:@std/dotenv/load";
import { Client, GatewayIntentBits } from "discord.js";

import commandsLoad from "./bot/commandsLoad.ts";
import eventsLoad from "./bot/eventsLoad.ts";

const TOKEN = Deno.env.get("DISCORD_TOKEN");

const client = new Client({
   intents: [
      /*
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
      */
   ],
});

client.commands = commandsLoad();
eventsLoad(client);

client.login(TOKEN);
