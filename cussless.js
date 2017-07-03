const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const swearjar = require("swearjar");

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
client.on("ready", () => {
  console.log(`Cussless enabled!`);
});

client.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member

  // If you want to send the message to a designated channel on a server instead
  // you can do the following:
  const channel = member.guild.channels.find('name', 'hi_bye');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}! No cussing!`);
});

client.on("message", message => {

if (message.author.bot) return;
let cussOutcome = Math.round(Math.random()*(3-1)+1);
let role = message.guild.roles.find("id", "330214330446381056");


if (message.content === 'cuss, secret') {
  swearjar.loadBadWords('./config/profanity.json');
  message.channel.send("")
}

if (swearjar.profane(message.content) === true) {
  let cusser = message.author;
  let unmuteMessage = "If you see this message, then something is wrong with the code. Tell Harry immediatly.";
  if (cussOutcome === 1) {
    message.channel.send(`Sorry ${cusser}, do the crime, do the time. You will be unsilenced in 1 minute.`)
    unmuteMessage = "you're free."
  } else if (cussOutcome === 2) {
    message.channel.send("https://youtu.be/hpigjnKl7nI?t=2s")
    message.channel.send("You will be unsilenced in 1 minute.")
    unmuteMessage = "let's see what's in the next container."
  } else if (cussOutcome === 3) {
    message.channel.send(`I'll take Discord for everything\n*Audience oooohs*\n${cusser}\nWho is the person who just got silenced and then will be unsilenced in 1 minute?\n***TINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTINGTING***`)
    unmuteMessage = "next question!"
  }
  message.member.addRole(role).catch(console.error);
  client.setTimeout(()=>message.member.removeRole(role).catch(console.error), 60000);
  client.setTimeout(()=>message.channel.send(`Ok ${cusser}, ${unmuteMessage}`), 60000);
}



});

client.login(config.token);
