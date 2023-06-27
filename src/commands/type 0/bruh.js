const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bruh")
    .setDescription("Replies with bruh."),
  async execute(interaction) {
    await interaction.reply("bruh");
  },
};
