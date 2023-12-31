const dotenv = require("dotenv");
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

dotenv.config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST().setToken(TOKEN);

// deleteing all previous commands to refresh
rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all bot slash commands."))
  .catch(console.error);

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  if (folder == "ignore") continue;

  // Loop through all the folders in the commands folder (except the ignore folder)
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  // Loop through all the files in the folder
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

(async () => {
  try {
    console.log(`${commands.length} slash command ready to refresh...`);

    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log(`${data.length} slash command successfully refreshed.`);
  } catch (error) {
    console.error(error);
  }
})();
