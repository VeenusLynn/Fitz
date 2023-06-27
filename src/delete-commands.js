// This file is used to delete all commands globally

const dotenv = require("dotenv");
const { REST, Routes } = require("discord.js");

dotenv.config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST().setToken(TOKEN);

// for global commands
rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
