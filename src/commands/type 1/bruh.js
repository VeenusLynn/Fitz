const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bruh")
    .setDescription("Replies with bruh."),
  async execute(interaction) {
    const bruhEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Bruh")
      .setTimestamp()
      .setFooter({
        text: "fitsy fits :P",
        iconURL:
          "https://cdn.discordapp.com/avatars/1120414600932884631/036f57b5cfc86dbafd59e30def8edad0.webp",
      });

    await interaction.reply({ embeds: [bruhEmbed] });
  },
};
