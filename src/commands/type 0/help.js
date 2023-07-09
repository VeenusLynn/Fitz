const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all of Fitz's slash commands and info."),
  async execute(interaction) {
    const helpEmbed = new EmbedBuilder()
      .setDescription("Here are all of Fitz's slash commands and info:")
      .setTimestamp()
      .setColor(0x0099ff)
      .addFields(
        {
          name: "**/help**  : ",
          value: "Shows all of Fitz's slash commands and info.",
        },
        { name: "**/bruh** : ", value: "Replies with bruh." },
        {
          name: "**/info user** : ",
          value: "Provides information about specified user.",
        },
        {
          name: "**/info server** : ",
          value: "Provides information about current server.",
        }
      );
    // Don't show unavailable commands (in the ignore folder)
    await interaction.reply({ embeds: [helpEmbed] });
  },
};
