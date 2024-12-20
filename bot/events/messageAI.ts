import { Events, Message } from "discord.js";
import { client } from "../../main.ts";

export default {
    name: Events.MessageCreate,
    once: false,
    execute(message: Message) {
       if (client.user && message.content.includes(`<@${client.user.id}>`)) {
         message.reply
       }
    },
 };
 