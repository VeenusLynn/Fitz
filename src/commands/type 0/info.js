const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Provides information about (user / server).")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription(
          "Provides information about the user running the command."
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Provides information about this server.")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() == "user") {
      await interaction.reply(
        `User ${interaction.user.tag}\njoined Discord at: ${
          interaction.user.createdAt
        }\njoined *_${interaction.guild.name}_* at: ${
          interaction.member.joinedAt
        }\navatar: ${interaction.user.avatarURL()}`
      );
    } else if (interaction.options.getSubcommand() == "server") {
      const owner = await interaction.guild.fetchOwner();

      await interaction.reply({
        content: `Server Name: ${
          interaction.guild.name
        }\nServer Owner: ${owner}\nServer Member Count: ${
          interaction.guild.memberCount
        }\nServer Created At: ${
          interaction.guild.createdAt
        }\nServer Icon: ${interaction.guild.iconURL()}`,
      });
    } else {
      await interaction.reply({
        content: "Error: Invalid subcommand.",
        ephemeral: true,
        embeds: [embed],
      });
    }
  },
};
