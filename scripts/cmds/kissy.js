const axios = require('axios');

module.exports = {
 config: {
 name: "kissy",
 aliases: [`Ai`],
 version: "2.1.0",
 author: "Orochi Team",
 longDescription: "chatgpt",
 category: "kissy",
 guide: {
 en: "{p}{n} questions",
 },
 },
 async makeApiRequest(encodedPrompt, uid, a) {
 try {
 const response = await axios.get(`https://orochiapis.replit.app/orochi?prompt=${encodedPrompt}`);
 return response.data.answer;
 } catch (error) {
 throw error;
 }
 },
 async handleCommand({ message, event, args, api }) {
 try {
 const uid = event.senderID;
 const encodedPrompt = encodeURIComponent(args.join(" "));
 const a = "repl";

 if (!encodedPrompt) {
 return message.reply("🤖 kissy bot\n\nHello! How can I assist you today!");
 } else {
 const result = await this.makeApiRequest(encodedPrompt, uid, a);

 message.reply({
 body: `🤖 kissy bot \n\n${result}`,
 }, (err, info) => {
 global.GoatBot.onReply.set(info.messageID, {
 commandName: this.config.name,
 messageID: info.messageID,
 author: event.senderID
 });
 });
 }
 } catch (error) {
 console.error("Error:", error.message);
 }
 },
 onStart: function (params) {
 return this.handleCommand(params);
 },
 onReply: function (params) {
 return this.handleCommand(params);
 },
};
